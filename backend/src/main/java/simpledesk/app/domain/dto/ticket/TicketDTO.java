package simpledesk.app.domain.dto.ticket;

import simpledesk.app.domain.dto.equipment.EquipmentDTO;
import simpledesk.app.domain.dto.status.StatusDTO;

import java.time.LocalDateTime;

public record TicketDTO(
        Long id,
        String title,
        String description,
        String urlPhoto,
        LocalDateTime created_at,
        EquipmentDTO equipment,
        StatusDTO status

) {
}
