package simpledesk.app.domain.dto.workflow;

import io.swagger.v3.oas.annotations.media.Schema;

public record WorkflowDTO(
        Long id,
        @Schema(type = "string", example = "doing")
        String name
) {
}
