package simpledesk.app.domain.dto.status;

import simpledesk.app.domain.dto.workflow.WorkflowDTO;

public record StatusDTO(
        Long id,
        String name,
        WorkflowDTO workflow
) {
}
