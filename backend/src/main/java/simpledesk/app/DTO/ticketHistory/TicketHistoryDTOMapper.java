package simpledesk.app.DTO.ticketHistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.status.StatusDTOMapper;
import simpledesk.app.DTO.ticket.TicketDTOMapper;
import simpledesk.app.entity.TicketHistory;

import java.util.function.Function;

@Service
public class TicketHistoryDTOMapper implements Function<TicketHistory, TicketHistoryDTO> {

    @Autowired
    TicketDTOMapper ticketDTOMapper;

    @Autowired
    StatusDTOMapper statusDTOMapper;

    @Override
    public TicketHistoryDTO apply(TicketHistory ticketHistory) {
        try {
            return new TicketHistoryDTO(
                    ticketHistory.getId(),
                    ticketHistory.getDescription(),
                    ticketHistory.getUrlPhoto(),
                    ticketDTOMapper.apply(ticketHistory.getTicket()),
                    statusDTOMapper.apply(ticketHistory.getStatus())
            );
        } catch (Exception e) {
            return new TicketHistoryDTO(
                    ticketHistory.getId(),
                    ticketHistory.getDescription(),
                    ticketHistory.getUrlPhoto(),
                    null,
                    null
            );
        }
    }
}
