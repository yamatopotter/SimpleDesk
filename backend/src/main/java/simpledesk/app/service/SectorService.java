package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.sector.SectorDTO;
import simpledesk.app.DTO.sector.SectorDTOMapper;
import simpledesk.app.entity.Sector;
import simpledesk.app.repository.ISectorRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class SectorService {
    private final SectorDTOMapper sectorDTOMapper;
    private final ISectorRepository sectorRepository;

    public List<SectorDTO> findAll() throws Exception {

        Stream<SectorDTO> sector;
        sector = sectorRepository.findAll().stream().map(sectorDTOMapper);
        return sector.toList();
    }


    public Optional<SectorDTO> findById(Long id) {

        Optional<SectorDTO> sector;
        sector = sectorRepository.findById(id).map(sectorDTOMapper);
        if (sector.isPresent()){
            return sector;
        } else {
            return Optional.of(null);
        }
    }

    public Optional<SectorDTO> addSector(SectorDTO sector) {

        if (sector == null || sectorRepository.findByName(sector.name()).isPresent()) {
            return Optional.of(null);
        } else {
            Optional<Sector> sectorEntity;

            Sector newSector = sectorRepository.saveAndFlush(
                    new Sector(
                            null,
                            sector.name()
                    )
            );

            return Optional.of(sectorDTOMapper.apply(newSector));
        }
    }

    public Boolean hardDeleteSector(Long id) {
        if(sectorRepository.findById(id).isPresent()){
            sectorRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<SectorDTO>updateSector(SectorDTO sector){
        if (sector == null || sectorRepository.findByName(sector.name()).isPresent()) { // Não pode atualizar para um setor já existente
            return Optional.of(null);

        } else {
            Sector sectorUpdate = new Sector(
                    sector.id(),
                    sector.name()
            );
            return Optional.of(sectorDTOMapper.apply(sectorRepository.saveAndFlush(sectorUpdate)));
        }
    }
}
