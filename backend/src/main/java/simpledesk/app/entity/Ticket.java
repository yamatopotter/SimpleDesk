package simpledesk.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String title;
    String description;
    String urlPhoto;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_idUser")
    User user;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_idEquipment")
    Equipment equipment;
    @Temporal(TemporalType.TIMESTAMP)
    LocalDateTime created_at;
}
