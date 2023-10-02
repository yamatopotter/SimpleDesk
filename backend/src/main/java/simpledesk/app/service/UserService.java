package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.user.UserInfoDTO;
import simpledesk.app.domain.dto.user.UserInfoDTOMapper;
import simpledesk.app.domain.dto.user.UserUpdateWithPasswordDTO;
import simpledesk.app.domain.dto.user.UserUpdateWithoutPasswordDTO;
import simpledesk.app.domain.entity.User;
import simpledesk.app.repository.IUserRepository;
import simpledesk.app.service.exceptions.DataIntegratyViolationException;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserInfoDTOMapper userInfoDTOMapper;
    private final IUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Transactional(readOnly = true)
    public List<UserInfoDTO> findAll() {
        return userRepository.findAll().stream()
                .map(userInfoDTOMapper)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<UserInfoDTO> findById(Long id) {
        return Optional.of(userRepository.findById(id)
                .map(userInfoDTOMapper)
                .orElseThrow(() -> new ObjectNotFoundException("User ID: " + id + " não encontrado.")));
    }

    @Transactional
    public Optional<UserInfoDTO> updateUserWithPassword(UserUpdateWithPasswordDTO user) {
        emptyAttributeWithPassword(user);
        Optional<User> userEntity = Optional.of(userRepository.findById(user.id()).get());

        var userToUpdate = User.builder()
                .id(user.id())
                .name(userEntity.get().getName())
                .email(userEntity.get().getEmail())
                .password(passwordEncoder.encode(user.password()))
                .phone(userEntity.get().getPhone())
                .role(userEntity.get().getRole())
                .build();

        userAlreadyRegistered(userToUpdate);
        return Optional.of(userInfoDTOMapper.apply(userRepository.saveAndFlush(userToUpdate)));

    }

    @Transactional
    public Optional<UserInfoDTO> updateUserWithoutPassword(UserUpdateWithoutPasswordDTO user) {
        emptyAttributeWithoutPassword(user);

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        User userEntity = userRepository.findByEmail(idUser).get();


        User userToUpdate = new User(
                user.id(),
                user.name(),
                user.email(),
                userEntity.getPassword(),
                user.phone(),
                user.role()
        );
        if (user.role() == null) userToUpdate.setRole(userEntity.getRole());

        userAlreadyRegistered(userToUpdate);
        return Optional.of(userInfoDTOMapper.apply(userRepository.saveAndFlush(userToUpdate)));
    }

    @Transactional
    public Boolean hardDeleteUser(Long id) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        User userEntity = userRepository.findByEmail(idUser).
                orElseThrow(() -> new ObjectNotFoundException("Usuário não encontrado."));

        if (!userEntity.getId().equals(id)) {
            if (userRepository.findById(id).isPresent()) {
                userRepository.deleteById(id);
                return true;
            }
        }
        return false;
    }

    @Transactional(readOnly = true)
    public void userAlreadyRegistered(User data) {
        Optional<User> userLogin = userRepository.findByEmail(data.getEmail());

        if (userLogin.isPresent() && !userLogin.get().getId().equals(data.getId()))
            throw new DataIntegratyViolationException("Usuário já registrado.");
    }

    public void emptyAttributeWithoutPassword(UserUpdateWithoutPasswordDTO data) {
        if (data.name() == null || data.name().isEmpty() || data.email() == null || data.email().isEmpty()
                || data.phone() == null || data.phone().isEmpty() || data.role() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários.");
    }

    public void emptyAttributeWithPassword(UserUpdateWithPasswordDTO data) {
        if (data.password() == null || data.password().isEmpty() || data.id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários.");
    }


}