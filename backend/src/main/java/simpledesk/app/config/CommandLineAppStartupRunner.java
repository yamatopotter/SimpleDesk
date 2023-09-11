package simpledesk.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import simpledesk.app.entity.Role;
import simpledesk.app.entity.User;
import simpledesk.app.repository.IUserRepository;

@Component
public class CommandLineAppStartupRunner implements CommandLineRunner {

    @Autowired
    IUserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByRole(Role.ADMIN).isEmpty()) {
            var user = User.builder()
                    .name("Administrador")
                    .email("administrador@simpledesk.com")
                    .password(passwordEncoder.encode("simpledesk"))
                    .phone("(21)91234-5678")
                    .role(Role.ADMIN)
                    .build();

            userRepository.save(user);
        }
    }
}
