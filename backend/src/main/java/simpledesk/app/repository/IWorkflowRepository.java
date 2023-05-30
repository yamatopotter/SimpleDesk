package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import simpledesk.app.entity.Workflow;

public interface IWorkflowRepository extends JpaRepository<Workflow, Long> {
}
