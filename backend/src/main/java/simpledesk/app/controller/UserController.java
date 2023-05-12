package simpledesk.app.controller;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.DTO.UserDTO;
import simpledesk.app.DTO.UserUpdateDTO;
import simpledesk.app.repository.IUserRepository;
import simpledesk.app.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*") // Liberando o controlador dos CORS
@RequestMapping(value = "/user")
@PreAuthorize("hasRole('ADMIN') or hasRole('USER')") // Retirando a permissão de USER futuramente.
public class UserController {
    final static Logger log = Logger.getLogger(String.valueOf(UserController.class));
    @Autowired
    private  IUserRepository repository;
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> findAll() {
        try {
            List<UserDTO> list = userService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e){
            log.error("Não foi possível buscar todos os usuários. " + e.getMessage());
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<UserDTO>> findById(@PathVariable Long id) throws Exception {
        try {
            log.info("Buscando o usuário pelo ID: " + id);
            Optional<UserDTO> user = userService.findById(id);

            if (user.isPresent()) return ResponseEntity.ok(user);
        } catch (Exception e) {
            log.error("Erro ao buscar o usuário de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<Optional<UserDTO>> updateUser(@RequestBody UserUpdateDTO user){

        try {
            log.info("Editando o usuario de ID: " + user.id());
            if (user != null){
                Optional<UserDTO> updateUser = userService.updateUser(user);
                if(updateUser.isPresent()){
                    return ResponseEntity.ok(updateUser);
                }
            }
        } catch (Exception e){
            log.error("Não foi possível editar o usuario de ID: "+ user.id());

            return ResponseEntity.badRequest().build();
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<UserDTO>> harDeleteUser(@PathVariable Long id){
        try {
            log.info("Deletando o usuario de ID: " + id);
            if (userService.hardDeleteUser(id)){
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            log.error("Não foi possível deletar o usuario de ID: " + id);
            return ResponseEntity.badRequest().build();
        }
    }
}