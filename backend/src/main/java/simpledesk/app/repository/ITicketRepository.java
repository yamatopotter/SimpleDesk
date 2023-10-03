package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.entity.Equipment;
import simpledesk.app.domain.entity.Status;
import simpledesk.app.domain.entity.Ticket;
import simpledesk.app.domain.entity.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface ITicketRepository extends JpaRepository<Ticket, Long> {
    @Transactional(readOnly = true)
    @Query("SELECT t FROM Ticket t JOIN t.equipment e JOIN e.equipmentType et WHERE et.name like :equipmentTypeName")
    List<Ticket> findByEquipmentTypeName(@Param("equipmentTypeName") String equipmentTypeName);
    @Transactional(readOnly = true)
    @Query("SELECT t FROM Ticket t JOIN t.status s JOIN s.workflow wf WHERE wf.name like :workflow")
    List<Ticket> findByWorkflow(@Param("workflow") String workflow);
    @Transactional(readOnly = true)
    Optional<Ticket> findByTitle(String title);
    @Transactional(readOnly = true)
    List<Ticket> findByUser(User user);
    @Transactional(readOnly = true)
    List<Ticket> findByStatus(Status status);
    @Transactional(readOnly = true)
    List<Ticket> findByEquipment(Equipment equipment);
}
