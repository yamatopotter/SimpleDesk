package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.entity.Workflow;

import java.util.Optional;
@Repository
public interface IWorkflowRepository extends JpaRepository<Workflow, Long> {
    @Transactional(readOnly = true)
    Optional<Workflow> findByName(String name);

}
