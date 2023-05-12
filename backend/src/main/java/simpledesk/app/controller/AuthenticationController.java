package simpledesk.app.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.auth.AuthenticationRequest;
import simpledesk.app.auth.AuthenticationResponse;
import simpledesk.app.auth.RegisterRequest;
import simpledesk.app.repository.IUserRepository;
import simpledesk.app.service.AuthenticationService;

@RestController
@CrossOrigin(origins = "*") // Liberando o controlador dos CORS
@RequestMapping("/authentication")
@RequiredArgsConstructor
public class AuthenticationController {
    private final IUserRepository repository;
    @Autowired
    private AuthenticationService service;


    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) throws Exception {
        if (repository.findByEmail(request.getEmail()).isPresent()){
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        } else {
            return new ResponseEntity<>(service.register(request), HttpStatus.CREATED);
        }
    }


    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> authentication(@RequestBody AuthenticationRequest request) throws Exception {
        return ResponseEntity.ok(service.authenticate(request));
    }
}