package simpledesk.app.DTO.ticket;

import simpledesk.app.DTO.equipment.EquipmentDTO;
import simpledesk.app.DTO.status.StatusDTO;
import simpledesk.app.DTO.ticketHistory.TicketHistoryDTO;
import simpledesk.app.DTO.user.UserDTO;

import java.util.List;

public record TicketDataDTO (
        Long id,
        String title,
        String description,
        String urlPhoto,
        UserDTO user,
        EquipmentDTO equipment,
        StatusDTO status,
        List<TicketHistoryDTO> history
){
}
