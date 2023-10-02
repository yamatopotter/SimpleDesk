package simpledesk.app.domain.dto.auth;

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
    private String name;
    private String email;
    private String password;
    private String phone;
    private Role role;
}
