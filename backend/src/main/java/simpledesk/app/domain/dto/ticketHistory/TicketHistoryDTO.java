package simpledesk.app.domain.dto.ticketHistory;

import simpledesk.app.domain.dto.status.StatusDTO;
import simpledesk.app.domain.dto.ticket.TicketDataDTO;
import simpledesk.app.domain.dto.user.UserDTO;

import java.time.LocalDateTime;

public record TicketHistoryDTO(
        Long id,
        String description,
        String urlPhoto,
        LocalDateTime created_at,
        UserDTO user,
        TicketDataDTO ticket,
        StatusDTO status
) {
}
