package simpledesk.app.controller;


import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.DTO.UserDTO;
import simpledesk.app.entity.User;
import simpledesk.app.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*") // Liberando o controlador dos CORS
@RequestMapping(value = "/user")
public class UserController {
    final static Logger log = Logger.getLogger(String.valueOf(UserController.class));

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<UserDTO>> buscarTodosUsuarios() {
        log.info("Realizando a busca de todos os usuários");
        List<UserDTO> list = userService.findAll();
        return ResponseEntity.ok().body(list);
    }


    @GetMapping(value = "/{id}")
    public ResponseEntity<Optional<User>> buscarUsuarioPorId(@PathVariable Long id) {
            log.info("Buscando o usuário pelo ID: " + id);
            return userService.findById(id);
    }


    @DeleteMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteUsuario(@PathVariable Long id) {
            log.info("Excluindo usuário de ID: " + id);
            return userService.deletar(id);
    }


}