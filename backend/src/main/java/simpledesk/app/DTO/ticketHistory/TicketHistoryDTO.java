package simpledesk.app.DTO.ticketHistory;

import simpledesk.app.DTO.status.StatusDTO;
import simpledesk.app.DTO.ticket.TicketDTO;
import simpledesk.app.DTO.user.UserDTO;

import java.time.LocalDateTime;

public record TicketHistoryDTO(
        Long id,
        String description,
        String urlPhoto,
        LocalDateTime created_at,
        UserDTO user,
        TicketDTO ticket,
        StatusDTO status
) {
}
