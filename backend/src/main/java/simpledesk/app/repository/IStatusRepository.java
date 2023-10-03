package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.entity.Status;
import simpledesk.app.domain.entity.Workflow;

import java.util.List;
import java.util.Optional;

@Repository
public interface IStatusRepository extends JpaRepository<Status, Long> {
    @Transactional(readOnly = true)
    Optional<Status> findByName(String name);
    @Transactional(readOnly = true)
    List<Status> findByWorkflow(Workflow workflow);
}
