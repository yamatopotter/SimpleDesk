package simpledesk.app.DTO.user;

import simpledesk.app.entity.Role;


public record UserUpdateWithPasswordDTO(
        Long id,
        String password
) {
}
