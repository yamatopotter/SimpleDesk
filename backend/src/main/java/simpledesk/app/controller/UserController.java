package simpledesk.app.controller;


import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.domain.dto.user.UserDTO;
import simpledesk.app.domain.dto.user.UserInfoDTO;
import simpledesk.app.domain.dto.user.UserUpdateWithPasswordDTO;
import simpledesk.app.domain.dto.user.UserUpdateWithoutPasswordDTO;
import simpledesk.app.service.UserService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value = "/user")
@Tag(description = "Usuários da aplicação", name = "Usuário")
@Slf4j
public class UserController {
    @Autowired
    private UserService userService;

    @Operation(summary = "Buscar todos os usuários")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserInfoDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<UserInfoDTO>> findAll() {
        try {
            log.info("Buscando todos os usuários do sistema.");
            List<UserInfoDTO> list = userService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            log.error("Não foi possível buscar todos os usuários.");
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Buscar usuário pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserInfoDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @GetMapping(value = "/{id}")
    public ResponseEntity<UserInfoDTO> findById(@PathVariable Long id) throws Exception {
        log.info("Searching for user ID: " + id);
        Optional<UserInfoDTO> user = userService.findById(id);
        return user.map(ResponseEntity::ok).orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Atualizar usuário com senha")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserInfoDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PutMapping("/password")
    public ResponseEntity<UserInfoDTO> updateUserWithPassword(@RequestBody UserUpdateWithPasswordDTO user) {
        log.info("Editando o usuario com senha de ID: " + user.id());
        Optional<UserInfoDTO> updateUser = userService.updateUserWithPassword(user);

        return updateUser.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());

    }

    @Operation(summary = "Atualizar usuário sem senha")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserInfoDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('ADMIN') or hasRole('USER')")
    @PutMapping
    public ResponseEntity<UserInfoDTO> updateUserWithoutPassword(@RequestBody UserUpdateWithoutPasswordDTO user) {
        log.info("Editando o usuario sem senha de ID: " + user.id());
        Optional<UserInfoDTO> updateUser = userService.updateUserWithoutPassword(user);

        return updateUser.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());

    }

    @Operation(summary = "Deletar usuário")
    @ApiResponse(responseCode = "204", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<UserDTO>> harDeleteUser(@PathVariable Long id) {
        log.info("Deletando o usuario de ID: " + id);

        return userService.hardDeleteUser(id) ? ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }
}