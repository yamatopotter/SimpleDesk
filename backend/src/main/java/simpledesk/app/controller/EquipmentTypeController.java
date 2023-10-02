package simpledesk.app.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.domain.dto.equipmentType.EquipmentTypeDTO;
import simpledesk.app.service.EquipmentTypeService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/equipmentType")
@Tag(description = "Tipo de equipamentos da aplicação", name = "Tipo de equipamento")
@Slf4j
public class EquipmentTypeController {


    @Autowired
    private EquipmentTypeService equipmentTypeService;

    @Operation(summary = "Buscar todos os tipos de equipamentos")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentTypeDTO.class))
    })
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

    @Operation(summary = "Buscar tipo de equipamento pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentTypeDTO.class))
    })
    @GetMapping("/{id}")
    public ResponseEntity<EquipmentTypeDTO> findById(@PathVariable Long id) {
        log.info("Buscando o tipo de equipamento pelo ID: " + id);

        Optional<EquipmentTypeDTO> equipmentType = equipmentTypeService.findById(id);
        return equipmentType.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Criar um tipo de equipamento")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentTypeDTO.class))
    })
    @PostMapping
    public ResponseEntity<EquipmentTypeDTO> addEquipmentType(@RequestBody EquipmentTypeDTO equipmentType) {
        log.info("Adicionando um novo tipo de equipamento");

        Optional<EquipmentTypeDTO> newEquipmentType = equipmentTypeService.addEquipmentType(equipmentType);
        return newEquipmentType.map(equipmentTypeDTO -> ResponseEntity.status(HttpStatus.CREATED).body(equipmentTypeDTO))
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Editar um tipo de equipamento")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentTypeDTO.class))
    })
    @PutMapping
    public ResponseEntity<EquipmentTypeDTO> updateEquipmentType(@RequestBody EquipmentTypeDTO equipmentType) {
        log.info("Editando o tipo de equipamento de ID: " + equipmentType.id());

        Optional<EquipmentTypeDTO> equipmentTypeUpdate = equipmentTypeService.updateEquipmentType(equipmentType);
        return equipmentTypeUpdate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Deletar tipo de equipamento")
    @ApiResponse(responseCode = "204", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = EquipmentTypeDTO.class))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<EquipmentTypeDTO>> hardDeleteEquipmentType(@PathVariable Long id) {
        log.info("Deletando o tipo de equipamento de ID: " + id);

        return equipmentTypeService.findById(id).isPresent() && equipmentTypeService.hardDeleteEquipmentType(id) ?
                ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


}


































