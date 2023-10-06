package simpledesk.app.domain.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import simpledesk.app.domain.entity.Role;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    @NotBlank
    @Schema(type = "string", example = "John Doe")
    private String name;
    @NotBlank
    @Schema(type = "string", example = "johndoe@gmail.com")
    private String email;
    @NotBlank
    @Schema(type = "string", example = "!Password#")
    private String password;
    @Schema(type = "string", example = "+55 (021) 98154-9872")
    private String phone;
    @Schema(type = "string", example = "USER")
    private Role role;
}
