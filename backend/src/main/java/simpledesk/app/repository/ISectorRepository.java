package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import simpledesk.app.domain.entity.Sector;

import java.util.Optional;

public interface ISectorRepository extends JpaRepository<Sector, Long>{
    Optional<Sector> findByName(String name);
}
