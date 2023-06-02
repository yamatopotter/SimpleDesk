package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import simpledesk.app.entity.Ticket;

import java.util.List;

@Repository
public interface ITicketRepository extends JpaRepository<Ticket, Long> {
    @Query("SELECT t FROM Ticket t JOIN t.equipment e JOIN e.equipmentType et WHERE et.name like :equipmentTypeName")
    List<Ticket> findByEquipmentTypeName(@Param("equipmentTypeName") String equipmentTypeName);

    @Query("SELECT t FROM Ticket t JOIN t.status s JOIN s.workflow wf WHERE wf.name like :workflow")
    List<Ticket> findByWorkflow(@Param("workflow") String workflow);

    @Query(value = "CALL usp_add_new_ticket(:title_data, :description_data, :urlPhoto_data, :id_user_data, :id_equipment_data, :id_status_data);", nativeQuery = true)
    void callProcedureNewTicket(
            @Param("title_data") String title_data,
            @Param("description_data") String description_data,
            @Param("urlPhoto_data") String urlPhoto_data,
            @Param("id_user_data") Long User_data,
            @Param("id_equipment_data") Long Equipment_data,
            @Param("id_status_data") Long Status_data);
}
