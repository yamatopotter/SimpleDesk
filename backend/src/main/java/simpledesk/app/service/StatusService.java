package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.sector.SectorDTO;
import simpledesk.app.DTO.status.StatusDTO;
import simpledesk.app.DTO.status.StatusDTOMapper;
import simpledesk.app.entity.Sector;
import simpledesk.app.entity.Status;
import simpledesk.app.repository.IStatusRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class StatusService {

    private final StatusDTOMapper statusDTOMapper;
    private final IStatusRepository statusRepository;

    public List<StatusDTO> findAll() {

        Stream<StatusDTO> status;
        status = statusRepository.findAll().stream().map(statusDTOMapper);
        return status.toList();
    }

    public Optional<StatusDTO> findById(Long id) {

        Optional<StatusDTO> status;
        status = statusRepository.findById(id).map(statusDTOMapper);
        if (status.isPresent()){
            return status;
        } else {
            return Optional.of(null);
        }
    }

    public Optional<StatusDTO> addStatus(StatusDTO status) {

        if (status == null || statusRepository.findByName(status.name()).isPresent()) {
            return Optional.of(null);
        } else {

           Status statusEntity = statusRepository.saveAndFlush(
                    new Status(
                            null,
                            status.name()
                    )
            );

            return Optional.of(statusDTOMapper.apply(statusEntity));
        }
    }

    public Boolean hardDeleteStatus(Long id) {
        if(statusRepository.findById(id).isPresent()){
            statusRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<StatusDTO>updateStatus(StatusDTO status){
        if (status == null || statusRepository.findByName(status.name()).isPresent()) { // Não pode atualizar para um status já existente
            return Optional.of(null);

        } else {
            Status statusUpdate = new Status(
                    status.id(),
                    status.name()
            );
            return Optional.of(statusDTOMapper.apply(statusRepository.saveAndFlush(statusUpdate)));
        }
    }

}











