package simpledesk.app.domain.dto.auth;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthenticationResponse {

    @Schema(type = "string", example = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbmlzdHJhZG9yQHNpbXBsZWRlc2suY29tIiwiaWF0IjoxNjk2NTA5MTg5LCJleHAiOjE2OTY1NTIzODl9.lBeYIV8Fl3QliSanYRlW6LFi5hEj8-RO8uip58XNIkI")
    private String token;
}
