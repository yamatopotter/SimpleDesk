package simpledesk.app.domain.dto.user;

import simpledesk.app.domain.entity.Role;

public record UserInfoDTO(
        Long id,
        String name,
        String email,
        String phone,
        Role role
) {
}
