package simpledesk.app.DTO.equipmentType;

import org.springframework.stereotype.Service;
import simpledesk.app.entity.EquipmentType;

import java.util.function.Function;

@Service
public class EquipmentTypeDTOMapper implements Function<EquipmentType, EquipmentTypeDTO> {
    @Override
    public EquipmentTypeDTO apply(EquipmentType equipmentType) {
        return new EquipmentTypeDTO(
                equipmentType.getId(),
                equipmentType.getName()
        );
    }
}
