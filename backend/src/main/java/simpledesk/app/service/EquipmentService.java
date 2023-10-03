package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.equipment.EquipmentDTO;
import simpledesk.app.domain.dto.equipment.EquipmentDTOMapper;
import simpledesk.app.domain.entity.Equipment;
import simpledesk.app.domain.entity.EquipmentType;
import simpledesk.app.domain.entity.Sector;
import simpledesk.app.domain.entity.Ticket;
import simpledesk.app.repository.IEquipmentRepositoy;
import simpledesk.app.repository.IEquipmentTypeRepository;
import simpledesk.app.repository.ISectorRepository;
import simpledesk.app.repository.ITicketRepository;
import simpledesk.app.service.exceptions.DataIntegratyViolationException;
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
    private final ITicketRepository ticketRepository;
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

        Sector sectorToEquipment = sectorRepository.findById(equipmentDTO.sector().id())
                .orElseThrow(() -> new ObjectNotFoundException("Setor de ID: " + equipmentDTO.sector().id() + " não foi encontrado."));

        EquipmentType equipmentTypeToEquipment = equipmentTypeRepository.findById(equipmentDTO.equipment_type().id())
                .orElseThrow(() -> new ObjectNotFoundException("Tipo de equipamento de ID: " + equipmentDTO.equipment_type().id() + " não foi encontrado."));

        Equipment newEquipment = repository.save(
                new Equipment(null, equipmentDTO.name(), sectorToEquipment, equipmentTypeToEquipment));
        return Optional.of(mapper.apply(newEquipment));
    }

    @Transactional
    public Optional<EquipmentDTO> updateEquipment(EquipmentDTO equipmentDTO) {
        emptyAttributeUpdate(equipmentDTO);
        equipmentExists(equipmentDTO);

        Sector sectorToEquipment = sectorRepository.findById(equipmentDTO.sector().id())
                .orElseThrow(() -> new ObjectNotFoundException("Setor de ID: " + equipmentDTO.sector().id() + " não foi encontrado."));

        EquipmentType equipmentTypeToEquipment = equipmentTypeRepository.findById(equipmentDTO.equipment_type().id())
                .orElseThrow(() -> new ObjectNotFoundException("Tipo de equipamento de ID: " + equipmentDTO.equipment_type().id() + " não foi encontrado."));

        Equipment UpdateEquipment = repository.save(
                new Equipment(equipmentDTO.id(), equipmentDTO.name(), sectorToEquipment, equipmentTypeToEquipment));
        return Optional.of(mapper.apply(UpdateEquipment));
    }

    @Transactional
    public Boolean hardDeleteEquipment(Long id) {
        validatingTheIntegrityOfTheRelationship(id);
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }


    @Transactional(readOnly = true)
    public void equipmentExists(EquipmentDTO equipmentDTO) {
        Optional<Equipment> equipment = repository.findById(equipmentDTO.id());
        if (equipment.isEmpty())
            throw new ObjectNotFoundException("O equipment de ID: " + equipmentDTO.id() + " não existe.");
    }

    @Transactional(readOnly = true)
    public void validatingTheIntegrityOfTheRelationship(Long id) {
        Equipment equipment = repository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Equipment de ID: " + id + " não foi encontrado."));

        List<Ticket> tickets = ticketRepository.findByEquipment(equipment);

        for (Ticket ticket : tickets) {
            if (ticket.getEquipment().getId().equals(equipment.getId()))
                throw new DataIntegratyViolationException("O equipment está vinculado a um ticket.");
        }
    }

    public void emptyAttribute(EquipmentDTO equipmentDTO) {
        if (equipmentDTO.name().isEmpty() || equipmentDTO.sector() == null || equipmentDTO.sector().id() == null ||
                equipmentDTO.equipment_type() == null || equipmentDTO.equipment_type().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }

    public void emptyAttributeUpdate(EquipmentDTO equipmentDTO) {
        if (equipmentDTO.id() == null || equipmentDTO.name().isEmpty() || equipmentDTO.sector() == null ||
                equipmentDTO.sector().id() == null || equipmentDTO.equipment_type() == null ||
                equipmentDTO.equipment_type().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }


}











