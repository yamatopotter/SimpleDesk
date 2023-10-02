package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.entity.Role;
import simpledesk.app.domain.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Long> {
    @Transactional(readOnly = true)
    Optional<User> findByEmail(String email);
    @Transactional(readOnly = true)
    List<User> findByRole(Role role);
}
