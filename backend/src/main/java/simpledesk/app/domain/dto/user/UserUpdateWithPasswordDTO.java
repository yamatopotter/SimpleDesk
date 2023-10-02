package simpledesk.app.domain.dto.user;


public record UserUpdateWithPasswordDTO(
        Long id,
        String password
) {
}
