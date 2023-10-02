package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import simpledesk.app.domain.entity.EquipmentType;

import java.util.Optional;

public interface IEquipmentTypeRepository extends JpaRepository<EquipmentType, Long> {
    Optional<EquipmentType> findByName(String name);
}
