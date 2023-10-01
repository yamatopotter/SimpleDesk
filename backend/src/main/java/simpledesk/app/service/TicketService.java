package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.DTO.ticket.TicketDTO;
import simpledesk.app.DTO.ticket.TicketDTOMapper;
import simpledesk.app.entity.Equipment;
import simpledesk.app.entity.Status;
import simpledesk.app.entity.Ticket;
import simpledesk.app.entity.User;
import simpledesk.app.repository.IEquipmentRepositoy;
import simpledesk.app.repository.IStatusRepository;
import simpledesk.app.repository.ITicketRepository;
import simpledesk.app.repository.IUserRepository;
import simpledesk.app.service.exceptions.DataIntegratyViolationException;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

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

    @Transactional(readOnly = true)
    public List<TicketDTO> findAll() {
        return repository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TicketDTO> getTicketsByEquipmentTypeName(String equipmentTypeName) {
        List<TicketDTO> ticket;
        ticket = repository.findByEquipmentTypeName("%" + equipmentTypeName + "%").stream().map(mapper).toList();
        return ticket;
    }

    @Transactional(readOnly = true)
    public List<TicketDTO> getTicketsByWorkflow(String workflow) {
        List<TicketDTO> ticket;
        ticket = repository.findByWorkflow("%" + workflow + "%").stream().map(mapper).toList();
        return ticket;
    }

    @Transactional(readOnly = true)
    public Optional<TicketDTO> findById(Long id) {
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
    public Optional<TicketDTO> addTicket(TicketDTO ticketDTO) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String user = (String) principal;
        User userEntity = userRepository.findByEmail(user).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));

        findByTitle(ticketDTO);
        emptyAttribute(ticketDTO);

        Equipment equipmentToTicket = equipmentRepositoy.findById(ticketDTO.equipment().id())
                .orElseThrow(() -> new ObjectNotFoundException("Equipamento de ID: " + ticketDTO.equipment().id() + " não foi encontrado."));
        Status statusToTicket = statusRepository.findById(ticketDTO.status().id())
                .orElseThrow(() -> new ObjectNotFoundException("Satus de ID: " + ticketDTO.status().id() + " não foi encontrado."));


        Ticket ticket = repository.save(new Ticket(null, ticketDTO.title(), ticketDTO.description(),
                ticketDTO.urlPhoto(), userEntity, equipmentToTicket, statusToTicket, null));
        return Optional.of(mapper.apply(ticket));
    }
    @Transactional
    public Optional<TicketDTO> updateTicket(TicketDTO ticketDTO) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String user = (String) principal;
        User userEntity = userRepository.findByEmail(user).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));

        findByTitle(ticketDTO);
        emptyAttribute(ticketDTO);

        Equipment equipmentToTicket = equipmentRepositoy.findById(ticketDTO.equipment().id())
                .orElseThrow(() -> new ObjectNotFoundException("Equipamento de ID: " + ticketDTO.equipment().id() + " não foi encontrado."));
        Status statusToTicket = statusRepository.findById(ticketDTO.status().id())
                .orElseThrow(() -> new ObjectNotFoundException("Satus de ID: " + ticketDTO.status().id() + " não foi encontrado."));


        Ticket ticket = repository.save(new Ticket(ticketDTO.id(), ticketDTO.title(), ticketDTO.description(),
                ticketDTO.urlPhoto(), userEntity, equipmentToTicket, statusToTicket, ticketDTO.created_at()));
        return Optional.of(mapper.apply(ticket));
    }
    @Transactional
    public Boolean hardDeleteTicket(Long id) {
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


    public void emptyAttribute(TicketDTO ticketDTO) {
        if (ticketDTO.title().isEmpty() || ticketDTO.description().isEmpty() || ticketDTO.equipment() == null || ticketDTO.equipment().id() == null || ticketDTO.status() == null ||
                ticketDTO.status().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }


}











