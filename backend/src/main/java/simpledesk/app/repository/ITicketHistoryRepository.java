package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import simpledesk.app.entity.TicketHistory;

public interface ITicketHistoryRepository extends JpaRepository<TicketHistory, Long> {
}
