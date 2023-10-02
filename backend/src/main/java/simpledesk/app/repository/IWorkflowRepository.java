package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import simpledesk.app.domain.entity.Workflow;

import java.util.Optional;

public interface IWorkflowRepository extends JpaRepository<Workflow, Long> {
    Optional<Workflow> findByName(String name);

}
