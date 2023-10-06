package simpledesk.app.domain.dto.equipment;

import io.swagger.v3.oas.annotations.media.Schema;
import simpledesk.app.domain.dto.equipmentType.EquipmentTypeDTO;
import simpledesk.app.domain.dto.sector.SectorDTO;

public record EquipmentDTO(
        Long id,
        @Schema(type = "string", example = "Dell")
        String name,
        @Schema(type = "string", example = "{id: 1}")
        SectorDTO sector,
        @Schema(type = "string", example = "{id: 1}")
        EquipmentTypeDTO equipment_type
) {
}
