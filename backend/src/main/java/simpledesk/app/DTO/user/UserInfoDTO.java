package simpledesk.app.DTO.user;

import simpledesk.app.entity.Role;

public record UserInfoDTO(
        Long id,
        String name,
        String email,
        String phone,
        Role role
) {
}
