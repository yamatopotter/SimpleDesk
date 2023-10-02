package simpledesk.app.domain.dto.equipment;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simpledesk.app.domain.dto.equipmentType.EquipmentTypeDTOMapper;
import simpledesk.app.domain.dto.sector.SectorDTOMapper;
import simpledesk.app.domain.entity.Equipment;

import java.util.function.Function;

@Service
public class EquipmentDTOMapper implements Function<Equipment, EquipmentDTO> {

    @Autowired
    SectorDTOMapper sectorDTOMapper;

    @Autowired
    EquipmentTypeDTOMapper equipmentTypeDTOMapper;

    @Override
    public EquipmentDTO apply(Equipment equipment) {

        try {
            return new EquipmentDTO(
                    equipment.getId(),
                    equipment.getName(),
                    sectorDTOMapper.apply(equipment.getSector()),
                    equipmentTypeDTOMapper.apply(equipment.getEquipmentType())
            );
        } catch (Exception e) {
            return new EquipmentDTO(
                equipment.getId(),
                equipment.getName(),
                    null,
                    null
            );
        }


    }
}
