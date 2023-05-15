package simpledesk.app.DTO.ticket;

import simpledesk.app.DTO.equipment.EquipmentDTO;
import simpledesk.app.DTO.user.UserDTO;

import java.time.LocalDateTime;

public record TicketUpdateDTO(
        Long id,
        String title,
        String description,
        String urlPhoto,
        UserDTO user,
        EquipmentDTO equipment,
        LocalDateTime created_at

) {
}
