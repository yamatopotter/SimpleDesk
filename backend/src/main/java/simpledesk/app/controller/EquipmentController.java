package simpledesk.app.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.DTO.equipment.EquipmentDTO;
import simpledesk.app.DTO.sector.SectorDTO;
import simpledesk.app.service.EquipmentService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/equipment")
@Tag(description = "Equipamentos da aplicação", name = "Equipamento")
public class EquipmentController {

    final static Logger log = Logger.getLogger(String.valueOf(SectorController.class));

    @Autowired
    private EquipmentService equipmentService;

    @Operation(summary = "Buscar todos os equipamentos")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentDTO.class))
    })
    @GetMapping
    public ResponseEntity<List<EquipmentDTO>> findAll() {
        try {
            log.info("Buscando todos os equipamentos");
            List<EquipmentDTO> list = equipmentService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            log.error("Não foi possível buscar todos os equipamentos");
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Buscar equipamento pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentDTO.class))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Optional<EquipmentDTO>> findById(@PathVariable Long id) {
        try {
            log.info("Buscando o equipamento pelo ID: " + id);
            Optional<EquipmentDTO> equipment = equipmentService.findById(id);

            if (equipment.isPresent()) return ResponseEntity.ok(equipment);
        } catch (Exception e) {
            log.error("Não foi possível buscar o equipamento de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

    @Operation(summary = "Criar equipamento")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentDTO.class))
    })
    @PostMapping
    public ResponseEntity addEquipment(@RequestBody EquipmentDTO equipment) {
        try {
            log.info("Adicionando um novo equipamento");
            if (equipment != null) {
                Optional<EquipmentDTO> newEquipment = equipmentService.addEquipment(equipment);
                if (newEquipment.isPresent()) return new ResponseEntity<>(newEquipment, HttpStatus.CREATED);
            }
        } catch (Exception e) {
            log.error("Não foi possível adicionar o equipamento");
            return ResponseEntity.badRequest().build();
        }
        return null;
    }

    @Operation(summary = "Editar equipamento")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentDTO.class))
    })
    @PutMapping
    public ResponseEntity<Optional<EquipmentDTO>> updateEquipment(@RequestBody EquipmentDTO equipment) {
        try {
            log.info("Editando o equipamento de ID: " + equipment.id());
            if (equipment != null) {
                Optional<EquipmentDTO> equipmentUpdate = equipmentService.updateEquipment(equipment);
                if (equipmentUpdate.isPresent()) return ResponseEntity.ok(equipmentUpdate);
            }
        } catch (Exception e) {
            log.error("Não foi possível editar o equipamento de ID: " + equipment.id());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return null;
    }

    @Operation(summary = "Deletar equipamento")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentDTO.class))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<EquipmentDTO>> hardDeleteEquipment(@PathVariable Long id) {
        try {
            log.info("Deletando o equipamento de ID: " + id);
            if (equipmentService.findById(id).isPresent() && equipmentService.hardDeleteEquipment(id)) return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Não foi possível deletar o equipamento de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }











}
