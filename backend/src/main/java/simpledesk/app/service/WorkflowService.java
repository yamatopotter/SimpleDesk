package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.DTO.workflow.WorkflowDTO;
import simpledesk.app.DTO.workflow.WorkflowDTOMapper;
import simpledesk.app.entity.Workflow;
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
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }


    public void findByName(WorkflowDTO workflowDTO) {
        Optional<Workflow> workflow = repository.findByName(workflowDTO.name());
        if (workflow.isPresent() && !workflow.get().getId().equals(workflowDTO.id()))
            throw new DataIntegratyViolationException("Workflow já cadastrado.");
    }


    public void emptyAttribute(WorkflowDTO workflowDTO) {
        if (workflowDTO.name().isEmpty())
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }


}
