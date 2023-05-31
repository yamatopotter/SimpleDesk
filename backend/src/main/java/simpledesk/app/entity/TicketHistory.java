package simpledesk.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class TicketHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_idUser")
    User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="fk_idTicket")
    Ticket ticket;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="fk_idStatus")
    Status status;
    String description;
    String urlPhoto;
    @Temporal(TemporalType.TIMESTAMP)
    LocalDateTime created_at = LocalDateTime.now();


}
