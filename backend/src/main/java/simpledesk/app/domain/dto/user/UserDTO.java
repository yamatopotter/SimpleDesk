package simpledesk.app.domain.dto.user;

public record UserDTO(
        Long id,
        String name,
        String email,
        String phone
) {
}
