package simpledesk.app.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.domain.dto.auth.AuthenticationRequest;
import simpledesk.app.domain.dto.auth.AuthenticationResponse;
import simpledesk.app.domain.dto.auth.RegisterRequest;
import simpledesk.app.domain.dto.user.UserInfoDTO;
import simpledesk.app.repository.IUserRepository;
import simpledesk.app.service.AuthenticationService;

import java.util.Optional;

@RestController
@RequestMapping("/authentication")
@Tag(description = "Registro e Login na aplicação", name = "Autenticação")
@Slf4j
public class AuthenticationController {

    @Autowired
    private IUserRepository repository;
    @Autowired
    private AuthenticationService service;

    @Operation(summary = "Criar conta na aplicação")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = RegisterRequest.class))
    })
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        log.info("Adicionando um novo usuário");

        AuthenticationResponse newUser = service.register(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(newUser);
    }

    @Operation(summary = "Entrar no sistema")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationRequest.class))
    })
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authentication(@RequestBody AuthenticationRequest request) {
        log.info("Entrando no sistema");

        return ResponseEntity.ok(service.authenticate(request));
    }

    @Operation(summary = "Verificar que está logado no sistema")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserInfoDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping
    public ResponseEntity<Optional<UserInfoDTO>> infoUser() {

        return ResponseEntity.ok(service.infoUser());
    }
}