package simpledesk.app.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.domain.dto.equipment.EquipmentDTO;
import simpledesk.app.service.EquipmentService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/equipment")
@Tag(description = "Equipamentos da aplicação", name = "Equipamento")
@Slf4j
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    @Operation(summary = "Buscar todos os equipamentos")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
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
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/{id}")
    public ResponseEntity<EquipmentDTO> findById(@PathVariable Long id) {
        log.info("Buscando o equipamento pelo ID: " + id);

        Optional<EquipmentDTO> equipment = equipmentService.findById(id);
        return equipment.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());

    }

    @Operation(summary = "Criar equipamento")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public ResponseEntity<EquipmentDTO> addEquipment(@RequestBody EquipmentDTO equipment) {
        log.info("Adicionando um novo equipamento");

        Optional<EquipmentDTO> newEquipment = equipmentService.addEquipment(equipment);
        return newEquipment.map(equipmentDTO -> ResponseEntity.status(HttpStatus.CREATED).body(equipmentDTO))
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Editar equipamento")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping
    public ResponseEntity<EquipmentDTO> updateEquipment(@RequestBody EquipmentDTO equipment) {
        log.info("Editando o equipamento de ID: " + equipment.id());

        Optional<EquipmentDTO> equipmentUpdate = equipmentService.updateEquipment(equipment);
        return equipmentUpdate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Deletar equipamento")
    @ApiResponse(responseCode = "204", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<EquipmentDTO>> hardDeleteEquipment(@PathVariable Long id) {
        log.info("Deletando o equipamento de ID: " + id);

        return equipmentService.findById(id).isPresent() && equipmentService.hardDeleteEquipment(id) ?
                ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}
