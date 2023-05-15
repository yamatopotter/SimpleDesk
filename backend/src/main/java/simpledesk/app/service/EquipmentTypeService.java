package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.equipmentType.EquipmentTypeDTO;
import simpledesk.app.DTO.equipmentType.EquipmentTypeDTOMapper;
import simpledesk.app.entity.EquipmentType;
import simpledesk.app.entity.Sector;
import simpledesk.app.repository.IEquipmentTypeRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class EquipmentTypeService {

    private final EquipmentTypeDTOMapper equipmentTypeDTOMapper;
    private final IEquipmentTypeRepository equipmentTypeRepository;

    public List<EquipmentTypeDTO> findAll(){

        Stream<EquipmentTypeDTO> sector;
        sector = equipmentTypeRepository.findAll().stream().map(equipmentTypeDTOMapper);
        return sector.toList();
    }

    public Optional<EquipmentTypeDTO> findById(Long id) {

        Optional<EquipmentTypeDTO> equipmentTypeDTO;
        equipmentTypeDTO = equipmentTypeRepository.findById(id).map(equipmentTypeDTOMapper);
        if (equipmentTypeDTO.isPresent()){
            return equipmentTypeDTO;
        } else {
            return Optional.of(null);
        }
    }

    public Optional<EquipmentTypeDTO> addEquipmentType(EquipmentTypeDTO equipmentTypeDTO) {

        if (equipmentTypeDTO == null || equipmentTypeRepository.findByName(equipmentTypeDTO.name()).isPresent()) {
            return Optional.of(null);
        } else {
            Optional<Sector> sectorEntity;

            EquipmentType equipmentType = equipmentTypeRepository.saveAndFlush(
                    new EquipmentType(
                            null,
                            equipmentTypeDTO.name()
                    )
            );

            return Optional.of(equipmentTypeDTOMapper.apply(equipmentType));
        }
    }

    public Boolean hardDeleteEquipmentType(Long id) {
        if(equipmentTypeRepository.findById(id).isPresent()){
            equipmentTypeRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<EquipmentTypeDTO>updateEquipmentType(EquipmentTypeDTO equipmentTypeDTO){
        if (equipmentTypeDTO == null || equipmentTypeRepository.findByName(equipmentTypeDTO.name()).isPresent()) { // Não pode atualizar para um setor já existente
            return Optional.of(null);

        } else {
            EquipmentType equipmentTypeUpdate = new EquipmentType(
                    equipmentTypeDTO.id(),
                    equipmentTypeDTO.name()
            );
            return Optional.of(equipmentTypeDTOMapper.apply(equipmentTypeRepository.saveAndFlush(equipmentTypeUpdate)));
        }
    }


}
