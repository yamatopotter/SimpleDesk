package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.user.UserDTO;
import simpledesk.app.DTO.user.UserDTOMapper;
import simpledesk.app.DTO.user.UserUpdateDTO;
import simpledesk.app.entity.Role;
import simpledesk.app.entity.User;
import simpledesk.app.repository.IUserRepository;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserService{

    private final UserDTOMapper userDTOMapper;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;



    public List<UserDTO> findAll(){

        Stream<UserDTO> user;
        user = userRepository.findAll().stream().map(userDTOMapper);
        return user.toList();
    }


    public Optional<UserDTO> findById(Long id) {

        Optional<UserDTO> user;
        user = userRepository.findById(id).map(userDTOMapper);
        if (user.isPresent()){
            return user;
        } else {
            return Optional.of(null);
        }
    }

    public Boolean hardDeleteUser(Long id) {
        if(userRepository.findById(id).isPresent()){
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<UserDTO>updateUser(UserUpdateDTO user){

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        User userEntity = userRepository.findByEmail(idUser).get();

        if (user != null && userRepository.findByEmail(user.email()).isEmpty() || Objects.equals(userEntity.getEmail(), user.email())) {
            User userToUpdate = new User(
                    user.id(),
                    user.name(),
                    user.email(),
                    user.password(),
                    user.phone(),
                    user.role()
            );
            userToUpdate.setPassword(passwordEncoder.encode(userToUpdate.getPassword()));
            userToUpdate.setRole(Role.USER);
            return Optional.of(userDTOMapper.apply(userRepository.saveAndFlush(userToUpdate)));
        }
        return Optional.of(null);
    }

}