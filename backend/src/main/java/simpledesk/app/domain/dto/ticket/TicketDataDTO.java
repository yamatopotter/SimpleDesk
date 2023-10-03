package simpledesk.app.domain.dto.ticket;

import simpledesk.app.domain.dto.equipment.EquipmentDTO;
import simpledesk.app.domain.dto.status.StatusDTO;
import simpledesk.app.domain.dto.user.UserDTO;

import java.time.LocalDateTime;

public record TicketDataDTO(
        Long id,
        String title,
        String description,
        String urlPhoto,
        LocalDateTime created_at,
        UserDTO user,
        EquipmentDTO equipment,
        StatusDTO status

) {
}
