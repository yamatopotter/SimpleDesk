package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.equipment.EquipmentDTO;
import simpledesk.app.DTO.equipment.EquipmentDTOMapper;
import simpledesk.app.entity.Equipment;
import simpledesk.app.entity.EquipmentType;
import simpledesk.app.entity.Sector;
import simpledesk.app.repository.IEquipmentRepositoy;
import simpledesk.app.repository.IEquipmentTypeRepository;
import simpledesk.app.repository.ISectorRepository;
import simpledesk.app.repository.IUserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final IEquipmentRepositoy equipmentRepositoy;
    private final EquipmentDTOMapper equipmentDTOMapper;
    private final IUserRepository userRepository;
    private final IEquipmentTypeRepository equipmentTypeRepository;
    private final ISectorRepository sectorRepository;

    public List<EquipmentDTO> findAll(){

        Stream<EquipmentDTO> equipment;
        equipment = equipmentRepositoy.findAll().stream().map(equipmentDTOMapper);
        return equipment.toList();
    }

    public Optional<EquipmentDTO> findById(Long id) {

        Optional<EquipmentDTO> equipmentType;
        equipmentType = equipmentRepositoy.findById(id).map(equipmentDTOMapper);
        if (equipmentType.isPresent()){
            return equipmentType;
        } else {
            return Optional.of(null);
        }
    }

    public Optional<EquipmentDTO> addEquipment(EquipmentDTO equipmentDTO) {

        Optional<Sector> sectorToEquipment;
        Optional<EquipmentType> equipmentTypeToEquipment;

        sectorToEquipment = sectorRepository.findById(equipmentDTO.sector().id());
        equipmentTypeToEquipment = equipmentTypeRepository.findById(equipmentDTO.equipment_type().id());


        if (equipmentDTO == null || equipmentRepositoy.findByName(equipmentDTO.name()).isPresent()) {
            return Optional.of(null);
        } else {
            Equipment equipment = equipmentRepositoy.saveAndFlush(
                    new Equipment(
                            null,
                            equipmentDTO.name(),
                            sectorToEquipment.get(),
                            equipmentTypeToEquipment.get()
                    )
            );
            return Optional.of(equipmentDTOMapper.apply(equipment));
        }
    }

    public Boolean hardDeleteEquipment(Long id) {
        if(equipmentRepositoy.findById(id).isPresent()){
            equipmentRepositoy.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<EquipmentDTO>updateEquipment(EquipmentDTO equipmentDTO){

        Optional<Sector> sectorToEquipment;
        Optional<EquipmentType> equipmentTypeToEquipment;

        sectorToEquipment = sectorRepository.findById(equipmentDTO.sector().id());
        equipmentTypeToEquipment = equipmentTypeRepository.findById(equipmentDTO.equipment_type().id());

        if (equipmentDTO == null || equipmentRepositoy.findByName(equipmentDTO.name()).isPresent()) { // Não pode atualizar para um equipamento já existente
            return Optional.of(null);

        } else {

            Equipment equipmentUpdate = new Equipment(
                    equipmentDTO.id(),
                    equipmentDTO.name(),
                    sectorToEquipment.get(),
                    equipmentTypeToEquipment.get()
            );
            return Optional.of(equipmentDTOMapper.apply(equipmentRepositoy.saveAndFlush(equipmentUpdate)));
        }
    }


}











