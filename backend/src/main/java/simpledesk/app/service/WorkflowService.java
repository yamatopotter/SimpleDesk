package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.workflow.WorkflowDTO;
import simpledesk.app.domain.dto.workflow.WorkflowDTOMapper;
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
public class WorkflowService {

    private final WorkflowDTOMapper mapper;
    private final IWorkflowRepository repository;
    private final IStatusRepository statusRepository;

    @Transactional(readOnly = true)
    public List<WorkflowDTO> findAll() {
        return repository.findAll().stream()
                .map(mapper)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<WorkflowDTO> findById(Long id) {
        return Optional.of(repository.findById(id)
                .map(mapper)
                .orElseThrow(() -> new ObjectNotFoundException("Workflow de ID: " + id + " não encontrado.")));
    }

    @Transactional
    public Optional<WorkflowDTO> addWorkflow(WorkflowDTO workflow) {
        emptyAttribute(workflow);
        findByName(workflow);

        Workflow workflowEntity = repository.save(new Workflow(null, workflow.name()));
        return Optional.of(mapper.apply(workflowEntity));

    }

    @Transactional
    public Optional<WorkflowDTO> updateWorkflow(WorkflowDTO workflow) {
        emptyAttribute(workflow);
        findByName(workflow);

        Workflow workflowEntity = repository.save(new Workflow(workflow.id(), workflow.name()));
        return Optional.of(mapper.apply(workflowEntity));
    }

    @Transactional
    public Boolean hardDeleteWorkflow(Long id) {
        validatingTheIntegrityOfTheRelationship(id);
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public void findByName(WorkflowDTO workflowDTO) {
        Optional<Workflow> workflow = repository.findByName(workflowDTO.name());
        if (workflow.isPresent() && !workflow.get().getId().equals(workflowDTO.id()))
            throw new DataIntegratyViolationException("Workflow já cadastrado.");
    }
    @Transactional(readOnly = true)
    public void validatingTheIntegrityOfTheRelationship(Long id) {
        Workflow workflow = repository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("O workflow de ID: " + id + " não foi encontrado."));

        List<Status> statusList = statusRepository.findByWorkflow(workflow);

        for (Status status : statusList) {
            if (status.getWorkflow().getId().equals(workflow.getId()))
                throw new DataIntegratyViolationException("O workflow está vinculado a um status.");
        }

    }

    public void emptyAttribute(WorkflowDTO workflowDTO) {
        if (workflowDTO.name().isEmpty())
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }


}
