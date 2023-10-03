package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.entity.Status;
import simpledesk.app.domain.entity.Ticket;
import simpledesk.app.domain.entity.TicketHistory;
import simpledesk.app.domain.entity.User;

import java.util.List;

@Repository
public interface ITicketHistoryRepository extends JpaRepository<TicketHistory, Long> {
    @Transactional(readOnly = true)
    List<TicketHistory> findByTicket(Ticket ticket);

    @Transactional(readOnly = true)
    List<TicketHistory> findByUser(User user);

    @Transactional(readOnly = true)
    List<TicketHistory> findByStatus(Status status);
}
