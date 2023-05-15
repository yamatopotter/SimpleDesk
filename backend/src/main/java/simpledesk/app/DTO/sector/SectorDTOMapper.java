package simpledesk.app.DTO.sector;

import org.springframework.stereotype.Service;
import simpledesk.app.entity.Sector;

import java.util.function.Function;

@Service
public class SectorDTOMapper implements Function<Sector, SectorDTO> {

    @Override
    public SectorDTO apply(Sector sector) {
        return new SectorDTO(
                sector.getId(),
                sector.getName()
        );
    }
}
