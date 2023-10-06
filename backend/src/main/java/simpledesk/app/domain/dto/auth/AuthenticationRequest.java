package simpledesk.app.domain.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationRequest {
    @NotBlank
    @Schema(type = "string", example = "johndoe@gmail.com")
    private String email;
    @NotBlank
    @Schema(type = "string", example = "!Password#")
    String password;
}
