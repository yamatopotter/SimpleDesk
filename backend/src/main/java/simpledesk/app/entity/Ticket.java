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
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_idStatus")
    Status status;

}
