package simpledesk.app.domain.dto.user;

import io.swagger.v3.oas.annotations.media.Schema;
import simpledesk.app.domain.entity.Role;

public record UserInfoDTO(
        Long id,
        @Schema(type = "string", example = "John Doe")
        String name,
        @Schema(type = "string", example = "johndoe@gmail.com")
        String email,
        @Schema(type = "string", example = "+55 (021) 98154-9872")
        String phone,
        @Schema(type = "string", example = "USER")
        Role role
) {
}
