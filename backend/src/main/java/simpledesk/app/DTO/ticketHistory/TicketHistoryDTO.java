package simpledesk.app.DTO.ticketHistory;

import simpledesk.app.DTO.status.StatusDTO;
import simpledesk.app.DTO.ticket.TicketDTO;

public record TicketHistoryDTO(
        Long id,
        String description,
        String urlPhoto,
        TicketDTO ticket,
        StatusDTO status
) {
}
