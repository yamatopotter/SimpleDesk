package simpledesk.app.domain.dto.ticketHistory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simpledesk.app.domain.dto.status.StatusDTOMapper;
import simpledesk.app.domain.dto.ticket.TicketDTOMapper;
import simpledesk.app.domain.dto.user.UserDTOMapper;
import simpledesk.app.domain.entity.TicketHistory;

import java.util.function.Function;

@Service
public class TicketHistoryDTOMapper implements Function<TicketHistory, TicketHistoryDTO> {
    @Autowired
    UserDTOMapper userDTOMapper;

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
                    ticketHistory.getCreated_at(),
                    userDTOMapper.apply(ticketHistory.getUser()),
                    ticketDTOMapper.apply(ticketHistory.getTicket()),
                    statusDTOMapper.apply(ticketHistory.getStatus())
            );
        } catch (Exception e) {
            return new TicketHistoryDTO(
                    ticketHistory.getId(),
                    ticketHistory.getDescription(),
                    ticketHistory.getUrlPhoto(),
                    ticketHistory.getCreated_at(),
                    null,
                    null,
                    null
            );
        }
    }
}
