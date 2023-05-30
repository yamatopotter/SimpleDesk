package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.workflow.WorkflowDTO;
import simpledesk.app.DTO.workflow.WorkflowDTOMapper;
import simpledesk.app.entity.Workflow;
import simpledesk.app.repository.IWorkflowRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class WorkflowService {

    private final WorkflowDTOMapper workflowDTOMapper;
    private final IWorkflowRepository workflowRepository;

    public List<WorkflowDTO> findAll() {

        Stream<WorkflowDTO> status;
        status = workflowRepository.findAll().stream().map(workflowDTOMapper);
        return status.toList();
    }

    public Optional<WorkflowDTO> findById(Long id) {

        Optional<WorkflowDTO> workflow;
        workflow = workflowRepository.findById(id).map(workflowDTOMapper);
        if (workflow.isPresent()){
            return workflow;
        } else {
            return Optional.of(null);
        }
    }

    public Optional<WorkflowDTO> addWorkflow(WorkflowDTO workflow) {


        if (workflow == null) {
            return Optional.of(null);
        } else {

            Workflow workflowEntity = workflowRepository.saveAndFlush(
                    new Workflow(
                            null,
                            workflow.name()
                    )
            );

            return Optional.of(workflowDTOMapper.apply(workflowEntity));
        }
    }

    public Boolean hardDeleteWorkflow(Long id) {
        if(workflowRepository.findById(id).isPresent()){
            workflowRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<WorkflowDTO>updateWorkflow(WorkflowDTO workflow){

        if (workflow == null) {
            return Optional.of(null);

        } else {
            Workflow workflowUpdate = workflowRepository.saveAndFlush(
                    new Workflow(
                            workflow.id(),
                            workflow.name()
                    )
            );
            return Optional.of(workflowDTOMapper.apply(workflowRepository.saveAndFlush(workflowUpdate)));
        }
    }


}
