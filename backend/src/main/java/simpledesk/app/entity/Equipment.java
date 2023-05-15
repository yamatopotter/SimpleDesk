package simpledesk.app.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity
@Data
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Equipment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_idSector")
    Sector sector;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_idEquipmentType")
    EquipmentType equipmentType;
}
