package simpledesk.app.DTO.user;

import org.springframework.stereotype.Service;
import simpledesk.app.entity.User;

import java.util.function.Function;

@Service
public class UserInfoDTOMapper implements Function<User, UserInfoDTO> {
    @Override
    public UserInfoDTO apply(User user) {
        return new UserInfoDTO(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole()
        );
    }
}