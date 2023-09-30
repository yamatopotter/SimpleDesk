package simpledesk.app.DTO.user;

import simpledesk.app.entity.Role;


public record UserUpdateWithPasswordDTO(
        Long id,
        String name,
        String email,
        String password,
        String phone,
        Role role
) {
}
