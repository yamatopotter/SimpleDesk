package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.UserDTO;
import simpledesk.app.DTO.UserDTOMapper;
import simpledesk.app.DTO.UserUpdateDTO;
import simpledesk.app.controller.UserController;
import simpledesk.app.entity.Role;
import simpledesk.app.entity.User;
import simpledesk.app.repository.IUserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class UserService{

    private final UserDTOMapper userDTOMapper;
    private final IUserRepository userRepository;

    private final PasswordEncoder passwordEncoder;



    public List<UserDTO> findAll() throws Exception {

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

        if(user != null){
            User userToUpdate = new User(
                    user.id(),
                    user.name(),
                    user.email(),
                    user.password(),
                    user.phone(),
                    user.role(),
                    null
            );
            userToUpdate.setPassword(passwordEncoder.encode(userToUpdate.getPassword()));
            userToUpdate.setRole(Role.USER);
            return Optional.of(userDTOMapper.apply(userRepository.saveAndFlush(userToUpdate)));
        }
        return Optional.of(null);
    }

}