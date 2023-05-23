package simpledesk.app.DTO.workflow;

import org.springframework.stereotype.Service;
import simpledesk.app.entity.Workflow;

import java.util.function.Function;

@Service
public class WorkflowDTOMapper implements Function<Workflow, WorkflowDTO> {
    @Override
    public WorkflowDTO apply(Workflow workflow) {
        return new WorkflowDTO(
                workflow.getId(),
                workflow.getName()
        );
    }
}
