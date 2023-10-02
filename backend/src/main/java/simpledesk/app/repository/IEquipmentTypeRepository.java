package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.entity.EquipmentType;

import java.util.Optional;

public interface IEquipmentTypeRepository extends JpaRepository<EquipmentType, Long> {
    @Transactional(readOnly = true)
    Optional<EquipmentType> findByName(String name);
}
