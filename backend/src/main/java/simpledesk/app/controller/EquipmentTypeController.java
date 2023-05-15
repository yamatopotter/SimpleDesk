package simpledesk.app.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.DTO.equipmentType.EquipmentTypeDTO;
import simpledesk.app.service.EquipmentTypeService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/equipmentType")
@Tag(description = "Tipo de equipamentos da aplicação", name = "Tipo de equipamento")
public class EquipmentTypeController {

    final static Logger log = Logger.getLogger(String.valueOf(EquipmentTypeController.class));

    @Autowired
    private EquipmentTypeService equipmentTypeService;


    @GetMapping
    public ResponseEntity<List<EquipmentTypeDTO>> findAll() {
        try {
            log.info("Buscando todos os tipos de equipamentos");
            List<EquipmentTypeDTO> list = equipmentTypeService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            log.error("Não foi possível buscar todos os tipos de equipamentos");
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<EquipmentTypeDTO>> findById(@PathVariable Long id) {
        try {
            log.info("Buscando o tipo de equipamento pelo ID: " + id);
            Optional<EquipmentTypeDTO> equipmentType = equipmentTypeService.findById(id);

            if (equipmentType.isPresent()) return ResponseEntity.ok(equipmentType);
        } catch (Exception e) {
            log.error("Não foi possível buscar o tipo de equipamento de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

    @PostMapping
    public ResponseEntity addEquipmentType(@RequestBody EquipmentTypeDTO equipmentType) {
        try {
            log.info("Adicionando um novo tipo de equipamento");
            if (equipmentType != null) {
                Optional<EquipmentTypeDTO> newEquipmentType = equipmentTypeService.addEquipmentType(equipmentType);
                if (newEquipmentType.isPresent()) return new ResponseEntity<>(newEquipmentType, HttpStatus.CREATED);
            }
        } catch (Exception e) {
            log.error("Não foi possível adicionar o tipo de equipamento");
            return ResponseEntity.badRequest().build();
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<Optional<EquipmentTypeDTO>> updateEquipmentType(@RequestBody EquipmentTypeDTO equipmentType) {
        try {
            log.info("Editando o tipo de equipamento de ID: " + equipmentType.id());
            if (equipmentType != null) {
                Optional<EquipmentTypeDTO> sectorUpdate = equipmentTypeService.updateEquipmentType(equipmentType);
                if (sectorUpdate.isPresent()) return ResponseEntity.ok(sectorUpdate);
            }
        } catch (Exception e) {
            log.error("Não foi possível editar o tipo de equipamento de ID: " + equipmentType.id());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<EquipmentTypeDTO>> hardDeleteEquipmentType(@PathVariable Long id) {
        try {
            log.info("Deletando o tipo de equipamento de ID: " + id);
            if (equipmentTypeService.findById(id).isPresent() && equipmentTypeService.hardDeleteEquipmentType(id)) return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Não foi possível deletar o tipo de equipamento de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }


}


































