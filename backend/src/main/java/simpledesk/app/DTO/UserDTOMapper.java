package simpledesk.app.DTO;

import org.springframework.stereotype.Service;
import simpledesk.app.entity.User;

import java.util.function.Function;

@Service
public class UserDTOMapper implements Function<User, UserDTO> {
    @Override
    public UserDTO apply(User user) {
        return new UserDTO(
                user.getIdUser(),
                user.getName(),
                user.getEmail(),
                user.getPhone()
        );
    }
}
