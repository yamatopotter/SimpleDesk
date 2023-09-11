package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.DTO.sector.SectorDTO;
import simpledesk.app.DTO.sector.SectorDTOMapper;
import simpledesk.app.entity.Sector;
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
        emptyAttribute(sector);
        findByName(sector);

        Sector sectorUpdate = new Sector(sector.id(), sector.name());
        return Optional.of(mapper.apply(repository.save(sectorUpdate)));
    }

    @Transactional
    public Boolean hardDeleteSector(Long id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }


    @Transactional(readOnly = true)
    public void findByName(SectorDTO sectorDTO) {
        Optional<Sector> sector = repository.findByName(sectorDTO.name());
        if (sector.isPresent() && !sector.get().getId().equals(sectorDTO.id()))
            throw new DataIntegratyViolationException("Setor já cadastrado.");
    }


    public void emptyAttribute(SectorDTO sectorDTO) {
        if (sectorDTO.name().isEmpty())
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }
}
