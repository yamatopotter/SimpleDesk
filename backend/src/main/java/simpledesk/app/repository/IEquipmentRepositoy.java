package simpledesk.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.entity.Equipment;
import simpledesk.app.domain.entity.EquipmentType;
import simpledesk.app.domain.entity.Sector;

import java.util.List;
import java.util.Optional;

@Repository
public interface IEquipmentRepositoy extends JpaRepository<Equipment, Long> {
    @Transactional(readOnly = true)
    Optional<Equipment> findByName(String name);

    @Transactional(readOnly = true)
    List<Equipment> findByEquipmentType(EquipmentType equipmentType);
    @Transactional(readOnly = true)
    List<Equipment> findBySector(Sector sector);
}
