package simpledesk.app.DTO;

import lombok.Data;
import lombok.Setter;
import simpledesk.app.entity.Role;


public record UserUpdateDTO(
        Long id,
        String name,
        String email,
        String password,
        String phone,
        Role role
) {
}
