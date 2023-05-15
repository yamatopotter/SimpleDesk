package simpledesk.app.DTO.user;

public record UserDTO(
        Long id,
        String name,
        String email,
        String phone
) {
}
