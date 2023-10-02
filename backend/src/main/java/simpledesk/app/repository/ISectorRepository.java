package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.entity.Sector;

import java.util.Optional;
@Repository
public interface ISectorRepository extends JpaRepository<Sector, Long>{
    @Transactional(readOnly = true)
    Optional<Sector> findByName(String name);
}
