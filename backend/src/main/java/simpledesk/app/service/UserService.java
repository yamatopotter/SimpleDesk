package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.UserDTO;
import simpledesk.app.DTO.UserDTOMapper;
import simpledesk.app.entity.User;
import simpledesk.app.repository.IUserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
public class UserService{
    @Autowired
    private UserDTOMapper userDTOMapper;
    @Autowired
    private IUserRepository userRepository;


    public List<UserDTO> findAll() {
        Stream<UserDTO> user;
        user = userRepository.findAll().stream().map(userDTOMapper);
        return user.toList();
    }


    public ResponseEntity<Optional<User>> findById(Long id) {
        Optional<User> user;
        user = userRepository.findById(id);
        if (user.isPresent()){
            return new ResponseEntity<>(user, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }


    public ResponseEntity<String> deletar(Long id) {
        if(userRepository.findById(id).isPresent()){
            userRepository.deleteById(id);
            return ResponseEntity.ok().body("Usuário apagado!");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Usuário não encontrada!");
    }

}