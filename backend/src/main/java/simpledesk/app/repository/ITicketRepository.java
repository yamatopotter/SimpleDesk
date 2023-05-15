package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import simpledesk.app.entity.Ticket;

public interface ITicketRepository extends JpaRepository<Ticket, Long> {
}
