package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.ticketHistory.TicketHistoryDTO;
import simpledesk.app.DTO.ticketHistory.TicketHistoryDTOMapper;
import simpledesk.app.entity.*;
import simpledesk.app.repository.IStatusRepository;
import simpledesk.app.repository.ITicketHistoryRepository;
import simpledesk.app.repository.ITicketRepository;
import simpledesk.app.repository.IUserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TicketHistoryService {

    private final ITicketHistoryRepository ticketHistoryRepository;
    private final TicketHistoryDTOMapper ticketHistoryDTOMapper;
    private final IUserRepository userRepository;
    private final ITicketRepository ticketRepository;
    private final IStatusRepository statusRepository;

    public List<TicketHistoryDTO> findAll(){

        Stream<TicketHistoryDTO> ticket;
        ticket = ticketHistoryRepository.findAll().stream().map(ticketHistoryDTOMapper);
        return ticket.toList();
    }

    public Optional<TicketHistoryDTO> findById(Long id) {

        Optional<TicketHistoryDTO> ticket;
        ticket = ticketHistoryRepository.findById(id).map(ticketHistoryDTOMapper);
        if (ticket.isPresent()){
            return ticket;
        } else {
            return Optional.of(null);
        }
    }

    public Optional<TicketHistoryDTO> findByTicket(Ticket ticket) {

        Optional<List<TicketHistoryDTO>> ticketHistory;
        ticketHistory = ticketHistoryRepository.findByTicket(ticket);
        if (ticketHistory.isPresent()){
            return ticketHistory;
        } else {
            return Optional.empty();
        }
    }

    public Optional<TicketHistoryDTO> addTicketHistory(TicketHistoryDTO ticketHistoryDTO) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        Optional<User> userEntity = Optional.of(userRepository.findByEmail(idUser).get());

        Optional<Ticket> ticketToTicketHistory;
        Optional<Status> statusToTicketHistory;

        statusToTicketHistory = statusRepository.findById(ticketHistoryDTO.status().id());
        ticketToTicketHistory = ticketRepository.findById(ticketHistoryDTO.ticket().id());


        if (ticketHistoryDTO == null) {
            return Optional.of(null);
        } else {
            TicketHistory ticketHistory = ticketHistoryRepository.saveAndFlush(
                    new TicketHistory(
                            null,
                            userEntity.get(),
                            ticketToTicketHistory.get(),
                            statusToTicketHistory.get(),
                            ticketHistoryDTO.description(),
                            ticketHistoryDTO.urlPhoto()
                    )
            );
            return Optional.of(ticketHistoryDTOMapper.apply(ticketHistory));
        }
    }

    public Boolean hardDeleteTicketHistory(Long id) {
        if(ticketHistoryRepository.findById(id).isPresent()){
            ticketHistoryRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<TicketHistoryDTO> updateTicketHistory(TicketHistoryDTO ticket) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        Optional<User> userEntity = Optional.of(userRepository.findByEmail(idUser).get());

        Optional<Ticket> ticketToTicketHistory;
        Optional<Status> statusToTicketHistory;

        statusToTicketHistory = statusRepository.findById(ticket.status().id());
        ticketToTicketHistory = ticketRepository.findById(ticket.ticket().id());


        if (ticket == null) {
            return Optional.of(null);
        } else {
            TicketHistory ticketHistory = ticketHistoryRepository.saveAndFlush(
                    new TicketHistory(
                            ticket.id(),
                            userEntity.get(),
                            ticketToTicketHistory.get(),
                            statusToTicketHistory.get(),
                            ticket.description(),
                            ticket.urlPhoto()
                    )
            );
            return Optional.of(ticketHistoryDTOMapper.apply(ticketHistoryRepository.saveAndFlush(ticketHistory)));
        }
    }

}
