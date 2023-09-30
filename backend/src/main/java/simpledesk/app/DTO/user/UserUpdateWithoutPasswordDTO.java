package simpledesk.app.DTO.user;

import simpledesk.app.entity.Role;


public record UserUpdateWithoutPasswordDTO(
        Long id,
        String name,
        String email,
        String phone,
        Role role
) {
}
