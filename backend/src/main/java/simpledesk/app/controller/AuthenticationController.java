package simpledesk.app.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.apache.log4j.Logger;
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
@CrossOrigin(origins = "*") // Liberando o controlador dos CORS
@RequestMapping("/authentication")
@Tag(description = "Registro e Login na aplicação", name = "Autenticação")
@RequiredArgsConstructor
public class AuthenticationController {

    final static Logger log = Logger.getLogger(String.valueOf(AuthenticationController.class));
    private final IUserRepository repository;
    @Autowired
    private AuthenticationService service;

    @Operation(summary = "Criar conta na aplicação")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = RegisterRequest.class))
    })
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) throws Exception {
        if (repository.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return new ResponseEntity<>(service.register(request), HttpStatus.CREATED);
        }
    }

    @Operation(summary = "Entrar no sistema")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = AuthenticationRequest.class))
    })
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authentication(@RequestBody AuthenticationRequest request) throws Exception {
        return ResponseEntity.ok(service.authenticate(request));
    }

    @Operation(summary = "Verificar que está logado no sistema")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = UserInfoDTO.class))
    })
    @GetMapping
    public ResponseEntity<Optional<UserInfoDTO>> infoUser(){
        try {
            log.info("Buscando os dados do usuário logado");
            return ResponseEntity.ok(service.infoUser());
        } catch (Exception e){
            log.error("Não foi possível buscar os dados do usuário");
            return ResponseEntity.badRequest().build();
        }
    }
}