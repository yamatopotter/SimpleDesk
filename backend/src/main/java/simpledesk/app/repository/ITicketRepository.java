package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import simpledesk.app.domain.entity.Ticket;

import java.util.List;
import java.util.Optional;

@Repository
public interface ITicketRepository extends JpaRepository<Ticket, Long> {
    @Query("SELECT t FROM Ticket t JOIN t.equipment e JOIN e.equipmentType et WHERE et.name like :equipmentTypeName")
    List<Ticket> findByEquipmentTypeName(@Param("equipmentTypeName") String equipmentTypeName);

    @Query("SELECT t FROM Ticket t JOIN t.status s JOIN s.workflow wf WHERE wf.name like :workflow")
    List<Ticket> findByWorkflow(@Param("workflow") String workflow);

    Optional<Ticket> findByTitle(String title);
}
