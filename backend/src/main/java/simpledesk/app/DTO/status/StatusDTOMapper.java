package simpledesk.app.DTO.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.workflow.WorkflowDTOMapper;
import simpledesk.app.entity.Status;

import java.util.function.Function;

@Service
public class StatusDTOMapper implements Function<Status, StatusDTO> {
    @Autowired
    WorkflowDTOMapper workflowDTOMapper;

    @Override
    public StatusDTO apply(Status status) {
        try {
            return new StatusDTO(
                    status.getId(),
                    status.getName(),
                    workflowDTOMapper.apply(status.getWorkflow())
            );
        } catch (Exception e) {
            return new StatusDTO(
                    status.getId(),
                    status.getName(),
                    null
            );
        }
    }
}
