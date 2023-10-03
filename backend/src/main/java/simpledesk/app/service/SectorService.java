package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.sector.SectorDTO;
import simpledesk.app.domain.dto.sector.SectorDTOMapper;
import simpledesk.app.domain.entity.Equipment;
import simpledesk.app.domain.entity.Sector;
import simpledesk.app.repository.IEquipmentRepositoy;
import simpledesk.app.repository.ISectorRepository;
import simpledesk.app.service.exceptions.DataIntegratyViolationException;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SectorService {
    private final SectorDTOMapper mapper;
    private final ISectorRepository repository;
    private final IEquipmentRepositoy equipmentRepositoy;

    @Transactional(readOnly = true)
    public List<SectorDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<SectorDTO> findById(Long id) {
        return Optional.of(repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new ObjectNotFoundException("Setor de ID: " + id + " não encontrado.")));
    }

    @Transactional
    public Optional<SectorDTO> addSector(SectorDTO sector) {
        emptyAttribute(sector);
        findByName(sector);

        Sector newSector = repository.save(new Sector(null, sector.name()));
        return Optional.of(mapper.apply(newSector));
    }

    @Transactional
    public Optional<SectorDTO> updateSector(SectorDTO sector) {
        emptyAttributeUpdate(sector);
        sectorExists(sector);
        findByName(sector);

        Sector sectorUpdate = new Sector(sector.id(), sector.name());
        return Optional.of(mapper.apply(repository.save(sectorUpdate)));
    }

    @Transactional
    public Boolean hardDeleteSector(Long id) {
        validatingTheIntegrityOfTheRelationship(id);
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public void sectorExists(SectorDTO sectorDTO) {
        Optional<Sector> sector = repository.findById(sectorDTO.id());
        if (sector.isEmpty())
            throw new ObjectNotFoundException("O sector de ID: " + sectorDTO.id() + " não existe.");
    }

    @Transactional(readOnly = true)
    public void findByName(SectorDTO sectorDTO) {
        Optional<Sector> sector = repository.findByName(sectorDTO.name());
        if (sector.isPresent() && !sector.get().getId().equals(sectorDTO.id()))
            throw new DataIntegratyViolationException("Setor já cadastrado.");
    }

    @Transactional(readOnly = true)
    public void validatingTheIntegrityOfTheRelationship(Long id) {
        Sector sector = repository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Sector de ID: " + id + " não foi encontrado."));

        List<Equipment> equipmentList = equipmentRepositoy.findBySector(sector);

        for (Equipment equipment : equipmentList) {
            if (equipment.getEquipmentType().getId().equals(sector.getId()))
                throw new DataIntegratyViolationException("O sector está vinculado a um equipment");
        }
    }


    public void emptyAttribute(SectorDTO sectorDTO) {
        if (sectorDTO.name().isEmpty())
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }
    public void emptyAttributeUpdate(SectorDTO sectorDTO) {
        if (sectorDTO.id() == null || sectorDTO.name().isEmpty())
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }
}
