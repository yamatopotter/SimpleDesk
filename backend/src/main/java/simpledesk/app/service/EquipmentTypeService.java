package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.equipmentType.EquipmentTypeDTO;
import simpledesk.app.domain.dto.equipmentType.EquipmentTypeDTOMapper;
import simpledesk.app.domain.entity.EquipmentType;
import simpledesk.app.repository.IEquipmentTypeRepository;
import simpledesk.app.service.exceptions.DataIntegratyViolationException;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EquipmentTypeService {

    private final EquipmentTypeDTOMapper mapper;
    private final IEquipmentTypeRepository repository;

    @Transactional(readOnly = true)
    public List<EquipmentTypeDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<EquipmentTypeDTO> findById(Long id) {
        return Optional.of(repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new ObjectNotFoundException("Tipo de equipamento de ID: " + id + " não encontrado.")));
    }

    @Transactional
    public Optional<EquipmentTypeDTO> addEquipmentType(EquipmentTypeDTO equipmentTypeDTO) {
        emptyAttribute(equipmentTypeDTO);
        findByName(equipmentTypeDTO);

        EquipmentType newEquipmentType = repository.save(new EquipmentType(null, equipmentTypeDTO.name()));
        return Optional.of(mapper.apply(newEquipmentType));
    }

    @Transactional
    public Optional<EquipmentTypeDTO> updateEquipmentType(EquipmentTypeDTO equipmentTypeDTO) {
        emptyAttribute(equipmentTypeDTO);
        findByName(equipmentTypeDTO);

        EquipmentType newEquipmentType = new EquipmentType(equipmentTypeDTO.id(), equipmentTypeDTO.name());
        return Optional.of(mapper.apply(repository.save(newEquipmentType)));
    }

    @Transactional
    public Boolean hardDeleteEquipmentType(Long id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public void findByName(EquipmentTypeDTO equipmentTypeDTO) {
        Optional<EquipmentType> equipmentType = repository.findByName(equipmentTypeDTO.name());
        if (equipmentType.isPresent() && !equipmentType.get().getId().equals(equipmentTypeDTO.id()))
            throw new DataIntegratyViolationException("Tipo de equipamento já cadastrado.");
    }


    public void emptyAttribute(EquipmentTypeDTO equipmentTypeDTO) {
        if (equipmentTypeDTO.name().isEmpty())
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }


}
