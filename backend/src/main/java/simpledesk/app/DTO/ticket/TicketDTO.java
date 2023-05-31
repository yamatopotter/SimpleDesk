package simpledesk.app.DTO.ticket;

import simpledesk.app.DTO.equipment.EquipmentDTO;
import simpledesk.app.DTO.status.StatusDTO;
import simpledesk.app.DTO.user.UserDTO;

public record TicketDTO(
        Long id,
        String title,
        String description,
        String urlPhoto,
        UserDTO user,
        EquipmentDTO equipment,
        StatusDTO status
) {
}
