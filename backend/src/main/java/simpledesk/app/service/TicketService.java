package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.ticket.TicketDTO;
import simpledesk.app.domain.dto.ticket.TicketDTOMapper;
import simpledesk.app.domain.dto.ticket.TicketDataDTO;
import simpledesk.app.domain.entity.*;
import simpledesk.app.repository.*;
import simpledesk.app.service.exceptions.DataIntegratyViolationException;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final ITicketRepository repository;
    private final TicketDTOMapper mapper;
    private final IEquipmentRepositoy equipmentRepositoy;
    private final IUserRepository userRepository;
    private final IStatusRepository statusRepository;

    private final ITicketHistoryRepository ticketHistoryRepository;

    @Transactional(readOnly = true)
    public List<TicketDataDTO> findAll() {
        return repository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TicketDataDTO> getTicketsByEquipmentTypeName(String equipmentTypeName) {
        List<TicketDataDTO> ticket;
        ticket = repository.findByEquipmentTypeName("%" + equipmentTypeName + "%").stream().map(mapper).toList();
        return ticket;
    }

    @Transactional(readOnly = true)
    public List<TicketDataDTO> getTicketsByWorkflow(String workflow) {
        List<TicketDataDTO> ticket;
        ticket = repository.findByWorkflow("%" + workflow + "%").stream().map(mapper).toList();
        return ticket;
    }

    @Transactional(readOnly = true)
    public Optional<TicketDataDTO> findById(Long id) {
        return Optional.of(repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new ObjectNotFoundException("Ticket de ID: " + id + " não encontrado.")));
    }

    @Transactional(readOnly = true)
    public Optional<Ticket> findByEntityId(Long id) {
        return Optional.of(repository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Ticket de ID: " + id + " não encontrado.")));
    }

    @Transactional
    public Optional<TicketDataDTO> addTicket(TicketDTO ticketDTO) {
        findByTitle(ticketDTO);
        emptyAttribute(ticketDTO);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String user = (String) principal;
        User userEntity = userRepository.findByEmail(user).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));


        Equipment equipmentToTicket = equipmentRepositoy.findById(ticketDTO.equipment().id())
                .orElseThrow(() -> new ObjectNotFoundException("Equipamento de ID: " + ticketDTO.equipment().id() + " não foi encontrado."));
        Status statusToTicket = statusRepository.findById(ticketDTO.status().id())
                .orElseThrow(() -> new ObjectNotFoundException("Status de ID: " + ticketDTO.status().id() + " não foi encontrado."));


        Ticket ticket = repository.save(new Ticket(null, ticketDTO.title(), ticketDTO.description(),
                ticketDTO.urlPhoto(), userEntity, equipmentToTicket, statusToTicket, LocalDateTime.now()));

        ticketHistoryRepository.save(new TicketHistory(null, userEntity, ticket, statusToTicket, ticketDTO.description(), ticketDTO.urlPhoto(), LocalDateTime.now()));
        return Optional.of(mapper.apply(ticket));
    }

    @Transactional
    public Optional<TicketDataDTO> updateTicket(TicketDTO ticketDTO) {
        emptyAttributeUpdate(ticketDTO);
        ticketExists(ticketDTO);
        findByTitle(ticketDTO);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String user = (String) principal;
        User userEntity = userRepository.findByEmail(user).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));

        Ticket existingTicket = repository.findById(ticketDTO.id())
                .orElseThrow(() -> new ObjectNotFoundException("Ticket de ID: " + ticketDTO.id() + " não existe."));

        Equipment equipmentToTicket = equipmentRepositoy.findById(ticketDTO.equipment().id())
                .orElseThrow(() -> new ObjectNotFoundException("Equipamento de ID: " + ticketDTO.equipment().id() + " não foi encontrado."));

        Status statusToTicket = statusRepository.findById(ticketDTO.status().id())
                .orElseThrow(() -> new ObjectNotFoundException("Status de ID: " + ticketDTO.status().id() + " não foi encontrado."));



        Ticket ticket = repository.save(new Ticket(ticketDTO.id(), ticketDTO.title(), ticketDTO.description(),
                ticketDTO.urlPhoto(), userEntity, equipmentToTicket, statusToTicket, existingTicket.getCreated_at()));
        return Optional.of(mapper.apply(ticket));
    }

    @Transactional
    public Boolean hardDeleteTicket(Long id) {
        validatingTheIntegrityOfTheRelationship(id);
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }


    @Transactional(readOnly = true)
    public void findByTitle(TicketDTO ticketDTO) {
        Optional<Ticket> ticket = repository.findByTitle(ticketDTO.title());
        if (ticket.isPresent() && !ticket.get().getId().equals(ticketDTO.id()))
            throw new DataIntegratyViolationException("Ticket de título: " + ticketDTO.title() + " já cadastro.");
    }

    @Transactional(readOnly = true)
    public void ticketExists(TicketDTO ticketDTO) {
        Optional<Ticket> ticket = repository.findById(ticketDTO.id());
        if (ticket.isEmpty())
            throw new ObjectNotFoundException("Ticket de ID: " + ticketDTO.id() + " não existe.");
    }

    @Transactional(readOnly = true)
    public void validatingTheIntegrityOfTheRelationship(Long id) {
        Ticket ticket = repository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Ticket de ID: " + id + " não existe."));

        List<TicketHistory> ticketHistories = ticketHistoryRepository.findByTicket(ticket);

        for (TicketHistory history : ticketHistories) {
            if (history.getTicket().getId().equals(ticket.getId()))
                throw new DataIntegratyViolationException("Ticket está vinculado a um histórico de ticket.");
        }

    }

    public void emptyAttribute(TicketDTO ticketDTO) {
        if (ticketDTO.title().isEmpty() || ticketDTO.description().isEmpty() || ticketDTO.equipment() == null || ticketDTO.equipment().id() == null || ticketDTO.status() == null ||
                ticketDTO.status().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }

    public void emptyAttributeUpdate(TicketDTO ticketDTO) {
        if (ticketDTO.id() == null || ticketDTO.title().isEmpty() || ticketDTO.description().isEmpty() || ticketDTO.equipment() == null || ticketDTO.equipment().id() == null || ticketDTO.status() == null ||
                ticketDTO.status().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }


}











