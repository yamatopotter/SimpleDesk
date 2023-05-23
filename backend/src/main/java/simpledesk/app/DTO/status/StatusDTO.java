package simpledesk.app.DTO.status;

import simpledesk.app.DTO.workflow.WorkflowDTO;

public record StatusDTO(
        Long id,
        String name,
        WorkflowDTO workflow
) {
}
