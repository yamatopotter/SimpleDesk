package simpledesk.app.domain.dto.ticketHistory;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.v3.oas.annotations.media.Schema;
import simpledesk.app.domain.dto.status.StatusDTO;
import simpledesk.app.domain.dto.ticket.TicketDataDTO;
import simpledesk.app.domain.dto.user.UserDTO;

import java.time.LocalDateTime;

public record TicketHistoryDTO(
        Long id,
        @Schema(type = "string", example = "Verificação de funcionamento do computador")
        String description,
        @Schema(type = "string", example = "https://foto.com.br")
        String urlPhoto,
        @JsonIgnore
        LocalDateTime created_at,
        @JsonIgnore
        UserDTO user,
        @Schema(type = "string", example = "{id: 1}")
        TicketDataDTO ticket,
        @Schema(type = "string", example = "{id: 1}")
        StatusDTO status
) {
}
