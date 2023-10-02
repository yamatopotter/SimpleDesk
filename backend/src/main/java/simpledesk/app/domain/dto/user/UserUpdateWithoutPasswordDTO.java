package simpledesk.app.domain.dto.user;

import simpledesk.app.domain.entity.Role;


public record UserUpdateWithoutPasswordDTO(
        Long id,
        String name,
        String email,
        String phone,
        Role role
) {
}
