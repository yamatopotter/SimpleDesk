package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import simpledesk.app.entity.Status;

import java.util.Optional;

public interface IStatusRepository extends JpaRepository<Status, Long> {
    Optional<Status> findByName(String name);
}
