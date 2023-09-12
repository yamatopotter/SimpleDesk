package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.DTO.equipment.EquipmentDTO;
import simpledesk.app.DTO.equipment.EquipmentDTOMapper;
import simpledesk.app.entity.Equipment;
import simpledesk.app.entity.EquipmentType;
import simpledesk.app.entity.Sector;
import simpledesk.app.repository.IEquipmentRepositoy;
import simpledesk.app.repository.IEquipmentTypeRepository;
import simpledesk.app.repository.ISectorRepository;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EquipmentService {

    private final IEquipmentRepositoy repository;
    private final EquipmentDTOMapper mapper;
    private final IEquipmentTypeRepository equipmentTypeRepository;
    private final ISectorRepository sectorRepository;

    @Transactional(readOnly = true)
    public List<EquipmentDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<EquipmentDTO> findById(Long id) {
        return Optional.of(repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new ObjectNotFoundException("Equipamento de ID: " + id + " não encontrado.")));
    }

    @Transactional
    public Optional<EquipmentDTO> addEquipment(EquipmentDTO equipmentDTO) {
        emptyAttribute(equipmentDTO);

        Optional<Sector> sectorToEquipment = sectorRepository.findById(equipmentDTO.sector().id());
        Optional<EquipmentType> equipmentTypeToEquipment = equipmentTypeRepository.findById(equipmentDTO.equipment_type().id());

        Equipment newEquipment = repository.save(
                new Equipment(null, equipmentDTO.name(), sectorToEquipment.get(), equipmentTypeToEquipment.get()));
        return Optional.of(mapper.apply(newEquipment));
    }

    @Transactional
    public Optional<EquipmentDTO> updateEquipment(EquipmentDTO equipmentDTO) {
        emptyAttribute(equipmentDTO);

        Optional<Sector> sectorToEquipment = sectorRepository.findById(equipmentDTO.sector().id());
        Optional<EquipmentType> equipmentTypeToEquipment = equipmentTypeRepository.findById(equipmentDTO.equipment_type().id());

        Equipment UpdateEquipment = repository.save(
                new Equipment(equipmentDTO.id(), equipmentDTO.name(), sectorToEquipment.get(), equipmentTypeToEquipment.get()));
        return Optional.of(mapper.apply(repository.save(UpdateEquipment)));
    }

    @Transactional
    public Boolean hardDeleteEquipment(Long id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    public void emptyAttribute(EquipmentDTO equipmentDTO) {
        if (equipmentDTO.name().isEmpty() || equipmentDTO.sector() == null || equipmentDTO.equipment_type() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }


}











