package simpledesk.app.domain.dto.equipmentType;

import io.swagger.v3.oas.annotations.media.Schema;

public record EquipmentTypeDTO(
        Long id,
        @Schema(type = "string", example = "Computador")
        String name
) {
}
