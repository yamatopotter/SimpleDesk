package simpledesk.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TicketHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long idTicketHistory;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="fk_idTicket")
    Ticket ticket;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="fk_idStatus")
    Status status;
    String description;
    String urlPhoto;
    @Temporal(TemporalType.TIMESTAMP)
    LocalDateTime created_at;

}
