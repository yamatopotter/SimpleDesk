package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import simpledesk.app.domain.entity.Ticket;
import simpledesk.app.domain.entity.TicketHistory;

import java.util.List;

public interface ITicketHistoryRepository extends JpaRepository<TicketHistory, Long> {
    List<TicketHistory> findByTicket (Ticket ticket);
}
