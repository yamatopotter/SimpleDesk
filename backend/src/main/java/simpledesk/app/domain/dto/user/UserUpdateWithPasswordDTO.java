package simpledesk.app.domain.dto.user;


import io.swagger.v3.oas.annotations.media.Schema;

public record UserUpdateWithPasswordDTO(
        Long id,
        @Schema(type = "string", example = "!Password#")
        String password
) {
}
