package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.ticketHistory.TicketHistoryDTO;
import simpledesk.app.DTO.ticketHistory.TicketHistoryDTOMapper;
import simpledesk.app.entity.Status;
import simpledesk.app.entity.Ticket;
import simpledesk.app.entity.TicketHistory;
import simpledesk.app.entity.User;
import simpledesk.app.repository.IStatusRepository;
import simpledesk.app.repository.ITicketHistoryRepository;
import simpledesk.app.repository.ITicketRepository;
import simpledesk.app.repository.IUserRepository;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

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

    public List<TicketHistoryDTO> findAll() {
        return repository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    public Optional<TicketHistoryDTO> findById(Long id) {
        return Optional.of(repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new ObjectNotFoundException("Ticket History de ID: " + id + " não encontrado.")));
    }

    public List<TicketHistoryDTO> findByTicket(Ticket ticket) {
        return repository.findByTicket(ticket).stream().map(mapper).collect(Collectors.toList());
    }

    public Optional<TicketHistoryDTO> addTicketHistory(TicketHistoryDTO ticketHistoryDTO) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String user = (String) principal;
        User userEntity = userRepository.findByEmail(user).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));

        emptyAttribute(ticketHistoryDTO);

        Ticket ticketToTicketHistory = ticketRepository.findById(ticketHistoryDTO.ticket().id())
                .orElseThrow(() -> new ObjectNotFoundException("Ticket de ID: " + ticketHistoryDTO.ticket().id() + " não foi encontrado."));
        Status statusToTicketHistory = statusRepository.findById(ticketHistoryDTO.status().id())
                .orElseThrow(() -> new ObjectNotFoundException("Status de ID: " + ticketHistoryDTO.status().id() + " não foi encontrado."));

        TicketHistory ticketHistory = repository.saveAndFlush(new TicketHistory(null, userEntity, ticketToTicketHistory,
                statusToTicketHistory, ticketHistoryDTO.description(), ticketHistoryDTO.urlPhoto(), null));
        return Optional.of(mapper.apply(ticketHistory));

    }

    public Optional<TicketHistoryDTO> updateTicketHistory(TicketHistoryDTO ticketHistoryDTO) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String user = (String) principal;
        User userEntity = userRepository.findByEmail(user).orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));

        emptyAttribute(ticketHistoryDTO);

        Ticket ticketToTicketHistory = ticketRepository.findById(ticketHistoryDTO.ticket().id())
                .orElseThrow(() -> new ObjectNotFoundException("Ticket de ID: " + ticketHistoryDTO.ticket().id() + " não foi encontrado."));
        Status statusToTicketHistory = statusRepository.findById(ticketHistoryDTO.status().id())
                .orElseThrow(() -> new ObjectNotFoundException("Status de ID: " + ticketHistoryDTO.status().id() + " não foi encontrado."));


        TicketHistory ticketHistory = repository.saveAndFlush(new TicketHistory(ticketHistoryDTO.id(), userEntity, ticketToTicketHistory,
                statusToTicketHistory, ticketHistoryDTO.description(), ticketHistoryDTO.urlPhoto(), null));
        return Optional.of(mapper.apply(ticketHistory));
    }

    public Boolean hardDeleteTicketHistory(Long id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public void emptyAttribute(TicketHistoryDTO ticketHistoryDTO) {
        if (ticketHistoryDTO.description().isEmpty() || ticketHistoryDTO.urlPhoto() == null ||
                ticketHistoryDTO.ticket() == null || ticketHistoryDTO.ticket().id() == null ||
                ticketHistoryDTO.status() == null || ticketHistoryDTO.status().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }


}
