package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import simpledesk.app.entity.Equipment;

import java.util.Optional;

public interface IEquipmentRepositoy extends JpaRepository<Equipment, Long> {
    Optional<Equipment> findByName(String name);
}
