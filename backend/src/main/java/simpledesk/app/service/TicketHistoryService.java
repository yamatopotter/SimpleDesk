package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.ticketHistory.TicketHistoryDTO;
import simpledesk.app.domain.dto.ticketHistory.TicketHistoryDTOMapper;
import simpledesk.app.domain.entity.Status;
import simpledesk.app.domain.entity.Ticket;
import simpledesk.app.domain.entity.TicketHistory;
import simpledesk.app.domain.entity.User;
import simpledesk.app.repository.IStatusRepository;
import simpledesk.app.repository.ITicketHistoryRepository;
import simpledesk.app.repository.ITicketRepository;
import simpledesk.app.repository.IUserRepository;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketHistoryService {

    private final ITicketHistoryRepository repository;
    private final TicketHistoryDTOMapper mapper;
    private final IUserRepository userRepository;
    private final ITicketRepository ticketRepository;
    private final IStatusRepository statusRepository;

    @Transactional(readOnly = true)
    public List<TicketHistoryDTO> findAll() {
        return repository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<TicketHistoryDTO> findById(Long id) {
        return Optional.of(repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new ObjectNotFoundException("Histórico de Ticket de ID: " + id + " não encontrado.")));
    }

    @Transactional(readOnly = true)
    public List<TicketHistoryDTO> findByTicket(Ticket ticket) {
        return repository.findByTicket(ticket).stream().map(mapper).collect(Collectors.toList());
    }

    @Transactional
    public Optional<TicketHistoryDTO> addTicketHistory(TicketHistoryDTO ticketHistoryDTO) {
        emptyAttribute(ticketHistoryDTO);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String user = (String) principal;
        User userEntity = userRepository.findByEmail(user).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));


        Ticket ticketToTicketHistory = ticketRepository.findById(ticketHistoryDTO.ticket().id())
                .orElseThrow(() -> new ObjectNotFoundException("Ticket de ID: " + ticketHistoryDTO.ticket().id() + " não foi encontrado."));
        Status statusToTicketHistory = statusRepository.findById(ticketHistoryDTO.status().id())
                .orElseThrow(() -> new ObjectNotFoundException("Status de ID: " + ticketHistoryDTO.status().id() + " não foi encontrado."));

        TicketHistory ticketHistory = repository.save(new TicketHistory(null, userEntity, ticketToTicketHistory,
                statusToTicketHistory, ticketHistoryDTO.description(), ticketHistoryDTO.urlPhoto(), LocalDateTime.now()));

        ticketToTicketHistory.setStatus(ticketHistory.getStatus());
        return Optional.of(mapper.apply(ticketHistory));

    }

    @Transactional
    public Optional<TicketHistoryDTO> updateTicketHistory(TicketHistoryDTO ticketHistoryDTO) {
        emptyAttributeUpdate(ticketHistoryDTO);
        ticketHistoryExists(ticketHistoryDTO);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String user = (String) principal;
        User userEntity = userRepository.findByEmail(user).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));

        TicketHistory existingTicketHistory = repository.findById(ticketHistoryDTO.id())
                .orElseThrow(() -> new ObjectNotFoundException("Histórico de Ticket de ID: " + ticketHistoryDTO.id() + " não existe."));

        Ticket ticketToTicketHistory = ticketRepository.findById(ticketHistoryDTO.ticket().id())
                .orElseThrow(() -> new ObjectNotFoundException("Ticket de ID: " + ticketHistoryDTO.ticket().id() + " não foi encontrado."));
        Status statusToTicketHistory = statusRepository.findById(ticketHistoryDTO.status().id())
                .orElseThrow(() -> new ObjectNotFoundException("Status de ID: " + ticketHistoryDTO.status().id() + " não foi encontrado."));


        TicketHistory ticketHistory = repository.save(new TicketHistory(ticketHistoryDTO.id(), userEntity, ticketToTicketHistory,
                statusToTicketHistory, ticketHistoryDTO.description(), ticketHistoryDTO.urlPhoto(), existingTicketHistory.getCreated_at()));

        ticketToTicketHistory.setStatus(ticketHistory.getStatus());
        return Optional.of(mapper.apply(ticketHistory));
    }

    @Transactional
    public Boolean hardDeleteTicketHistory(Long id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }


    @Transactional(readOnly = true)
    public void ticketHistoryExists(TicketHistoryDTO ticketHistoryDTO) {
        Optional<TicketHistory> ticketHistory = repository.findById(ticketHistoryDTO.id());
        if (ticketHistory.isEmpty())
            throw new ObjectNotFoundException("Histórico de Ticket de ID: " + ticketHistoryDTO.id() + " não existe.");
    }

    public void emptyAttribute(TicketHistoryDTO ticketHistoryDTO) {
        if (ticketHistoryDTO.description().isEmpty() ||
                ticketHistoryDTO.ticket() == null || ticketHistoryDTO.ticket().id() == null ||
                ticketHistoryDTO.status() == null || ticketHistoryDTO.status().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }

    public void emptyAttributeUpdate(TicketHistoryDTO ticketHistoryDTO) {
        if (ticketHistoryDTO.id() == null || ticketHistoryDTO.description().isEmpty() ||
                ticketHistoryDTO.ticket() == null || ticketHistoryDTO.ticket().id() == null ||
                ticketHistoryDTO.status() == null || ticketHistoryDTO.status().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }


}
