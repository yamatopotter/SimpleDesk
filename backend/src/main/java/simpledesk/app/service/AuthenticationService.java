package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.auth.AuthenticationRequest;
import simpledesk.app.domain.dto.auth.AuthenticationResponse;
import simpledesk.app.domain.dto.auth.RegisterRequest;
import simpledesk.app.domain.dto.user.UserInfoDTO;
import simpledesk.app.domain.dto.user.UserInfoDTOMapper;
import simpledesk.app.domain.entity.User;
import simpledesk.app.infra.security.JwtService;
import simpledesk.app.repository.IUserRepository;
import simpledesk.app.service.exceptions.BadRequestException;
import simpledesk.app.service.exceptions.DataIntegratyViolationException;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final IUserRepository repository;
    private final UserInfoDTOMapper userInfoDTOMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticationResponse register(RegisterRequest request) {
        userAlreadyRegistered(request);
        emptyAttribute(request);
        passwordLength(request);

        var user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .role(request.getRole())
                .build();

        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Transactional
    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        var user = repository.findByEmail(request.getEmail())
                .orElseThrow(() -> new BadCredentialsException("Credenciais incorretas."));

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    @Transactional(readOnly = true)
    public Optional<UserInfoDTO> infoUser() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String user = (String) principal;

        User userEntity = repository.findByEmail(user)
                .orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));

        return Optional.of(userInfoDTOMapper.apply(userEntity));
    }

    @Transactional(readOnly = true)
    public void userAlreadyRegistered(RegisterRequest data) {
        Optional<User> userName = repository.findByName(data.getName());
        Optional<User> userEmail = repository.findByEmail(data.getEmail());

        if (userName.isPresent())
            throw new DataIntegratyViolationException("Usuário com o nome: " + userName.get().getName() + " já cadastrado.");
        if (userEmail.isPresent())
            throw new DataIntegratyViolationException("Usuário com o e-mail: " + userEmail.get().getEmail() + " já cadastrado.");
    }

    public void emptyAttribute(RegisterRequest data) {
        if (data.getName() == null || data.getName().isEmpty() || data.getEmail() == null || data.getEmail().isEmpty()
                || data.getPassword() == null || data.getPassword().isEmpty())
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }

    public void passwordLength(RegisterRequest data) {
        if (data.getPassword().length() < 8)
            throw new BadRequestException("A senha deve possuir mínimo 8 caracteres.");
    }

}