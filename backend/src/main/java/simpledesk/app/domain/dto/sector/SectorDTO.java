package simpledesk.app.domain.dto.sector;

import io.swagger.v3.oas.annotations.media.Schema;

public record SectorDTO(
        Long id,
        @Schema(type = "string", example = "Tecnologia da Informação")
        String name
) {
}
