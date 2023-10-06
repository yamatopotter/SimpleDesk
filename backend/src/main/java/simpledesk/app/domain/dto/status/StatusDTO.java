package simpledesk.app.domain.dto.status;

import io.swagger.v3.oas.annotations.media.Schema;
import simpledesk.app.domain.dto.workflow.WorkflowDTO;

public record StatusDTO(
        Long id,
        @Schema(type = "string", example = "Em atendimento")
        String name,
        @Schema(type = "string", example = "{id: 1}")
        WorkflowDTO workflow
) {
}
