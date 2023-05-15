package simpledesk.app.DTO.equipment;

import simpledesk.app.DTO.equipmentType.EquipmentTypeDTO;
import simpledesk.app.DTO.sector.SectorDTO;

public record EquipmentDTO(
        Long id,
        String name,
        SectorDTO sector,
        EquipmentTypeDTO equipment_type
) {
}
