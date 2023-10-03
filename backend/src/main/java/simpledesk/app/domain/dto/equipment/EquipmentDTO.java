package simpledesk.app.domain.dto.equipment;

import simpledesk.app.domain.dto.equipmentType.EquipmentTypeDTO;
import simpledesk.app.domain.dto.sector.SectorDTO;

public record EquipmentDTO(
        Long id,
        String name,
        SectorDTO sector,
        EquipmentTypeDTO equipment_type
) {
}
