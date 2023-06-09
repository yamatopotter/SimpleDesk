package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.status.StatusDTO;
import simpledesk.app.DTO.status.StatusDTOMapper;
import simpledesk.app.entity.Status;
import simpledesk.app.entity.Workflow;
import simpledesk.app.repository.IStatusRepository;
import simpledesk.app.repository.IWorkflowRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class StatusService {

    private final StatusDTOMapper statusDTOMapper;
    private final IStatusRepository statusRepository;
    private final IWorkflowRepository workflowRepository;

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

        Optional<Workflow> workflowToStatus;

        workflowToStatus = workflowRepository.findById(status.workflow().id());

        if (status == null || statusRepository.findByName(status.name()).isPresent()) {
            return Optional.of(null);
        } else {

           Status statusEntity = statusRepository.saveAndFlush(
                    new Status(
                            null,
                            status.name(),
                            workflowToStatus.get()
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

        Optional<Workflow> workflowToStatus;

        workflowToStatus = workflowRepository.findById(status.workflow().id());

        if (status == null || statusRepository.findByName(status.name()).isPresent()) { // Não pode atualizar para um status já existente
            return Optional.of(null);

        } else {
            Status statusUpdate = statusRepository.saveAndFlush(
              new Status(
                      status.id(),
                      status.name(),
                      workflowToStatus.get()
              )
            );
            return Optional.of(statusDTOMapper.apply(statusRepository.saveAndFlush(statusUpdate)));
        }
    }

}











