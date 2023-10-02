package simpledesk.app.domain.dto.status;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simpledesk.app.domain.dto.workflow.WorkflowDTOMapper;
import simpledesk.app.domain.entity.Status;

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
