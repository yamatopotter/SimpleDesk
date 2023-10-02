package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.status.StatusDTO;
import simpledesk.app.domain.dto.status.StatusDTOMapper;
import simpledesk.app.domain.entity.Status;
import simpledesk.app.domain.entity.Workflow;
import simpledesk.app.repository.IStatusRepository;
import simpledesk.app.repository.IWorkflowRepository;
import simpledesk.app.service.exceptions.DataIntegratyViolationException;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatusService {

    private final StatusDTOMapper mapper;
    private final IStatusRepository repository;
    private final IWorkflowRepository workflowRepository;

    @Transactional(readOnly = true)
    public List<StatusDTO> findAll() {
        return repository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<StatusDTO> findById(Long id) {
        return Optional.of(repository.findById(id).map(mapper).
                orElseThrow(() -> new ObjectNotFoundException("Status de ID: " + id + " não encontrado.")));
    }

    @Transactional
    public Optional<StatusDTO> addStatus(StatusDTO status) {
        emptyAttribute(status);
        findByName(status);

        Workflow workflowToStatus;
        workflowToStatus = workflowRepository.findById(status.workflow().id())
                .orElseThrow(() -> new ObjectNotFoundException("Workflow de ID: " + status.workflow().id() + " não foi encontrado."));

        Status statusEntity = repository.save(new Status(null, status.name(), workflowToStatus));
        return Optional.of(mapper.apply(statusEntity));
    }

    @Transactional
    public Optional<StatusDTO> updateStatus(StatusDTO status) {
        emptyAttribute(status);
        findByName(status);

        Workflow workflowToStatus;
        workflowToStatus = workflowRepository.findById(status.workflow().id())
                .orElseThrow(() -> new ObjectNotFoundException("Workflow de ID: " + status.workflow().id() + " não foi encontrado."));

        Status statusUpdate = repository.save(new Status(status.id(), status.name(), workflowToStatus));
        return Optional.of(mapper.apply(statusUpdate));
    }

    @Transactional
    public Boolean hardDeleteStatus(Long id) {
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }


    @Transactional(readOnly = true)
    public void findByName(StatusDTO statusDTO) {
        Optional<Status> status = repository.findByName(statusDTO.name());
        if (status.isPresent() && !status.get().getId().equals(statusDTO.id()))
            throw new DataIntegratyViolationException("Status já cadastrado.");
    }


    public void emptyAttribute(StatusDTO statusDTO) {
        if (statusDTO.name().isEmpty() || statusDTO.workflow() == null || statusDTO.workflow().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }

}











