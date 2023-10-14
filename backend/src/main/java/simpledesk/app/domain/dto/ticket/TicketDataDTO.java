package simpledesk.app.domain.dto.ticket;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import simpledesk.app.domain.dto.equipment.EquipmentDTO;
import simpledesk.app.domain.dto.status.StatusDTO;
import simpledesk.app.domain.dto.user.UserDTO;

import java.time.LocalDateTime;

public record TicketDataDTO(
        Long id,
        @Schema(type = "string", example = "Manutenção computador")
        String title,
        @Schema(type = "string", example = "Verificação de funcionamento do computador")
        String description,
        @Schema(type = "string", example = "https://foto.com.br")
        String urlPhoto,
        LocalDateTime created_at,
        UserDTO user,
        @Schema(type = "string", example = "{id: 1}")
        EquipmentDTO equipment,
        @Schema(type = "string", example = "{id: 1}")
        StatusDTO status

) {
}
