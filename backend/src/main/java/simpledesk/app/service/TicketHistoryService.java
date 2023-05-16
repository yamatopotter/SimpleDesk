package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.ticketHistory.TicketHistoryDTO;
import simpledesk.app.DTO.ticketHistory.TicketHistoryDTOMapper;
import simpledesk.app.DTO.ticketHistory.TicketHistoryUpdateDTO;
import simpledesk.app.entity.*;
import simpledesk.app.repository.IStatusRepository;
import simpledesk.app.repository.ITicketHistoryRepository;
import simpledesk.app.repository.ITicketRepository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TicketHistoryService {

    private final ITicketHistoryRepository ticketHistoryRepository;
    private final TicketHistoryDTOMapper ticketHistoryDTOMapper;
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

    public Optional<TicketHistoryDTO> addTicketHistory(TicketHistoryDTO ticketHistoryDTO) {

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
                            ticketToTicketHistory.get(),
                            statusToTicketHistory.get(),
                            ticketHistoryDTO.description(),
                            ticketHistoryDTO.urlPhoto(),
                            LocalDateTime.now()
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

    public Optional<TicketHistoryDTO> updateTicketHistory(TicketHistoryUpdateDTO ticket) {

        Optional<Ticket> ticketToTicketHistory;
        Optional<Status> statusToTicketHistory;
        Optional<TicketHistory> ticketHistoryAtual;

        statusToTicketHistory = statusRepository.findById(ticket.status().id());
        ticketToTicketHistory = ticketRepository.findById(ticket.ticket().id());
        ticketHistoryAtual = ticketHistoryRepository.findById(ticket.id());


        if (ticket == null) {
            return Optional.of(null);
        } else {
            TicketHistory ticketHistory = ticketHistoryRepository.saveAndFlush(
                    new TicketHistory(
                            ticket.id(),
                            ticketToTicketHistory.get(),
                            statusToTicketHistory.get(),
                            ticket.description(),
                            ticket.urlPhoto(),
                            ticketHistoryAtual.get().getCreated_at()
                    )
            );
            return Optional.of(ticketHistoryDTOMapper.apply(ticketHistoryRepository.saveAndFlush(ticketHistory)));
        }
    }

}
