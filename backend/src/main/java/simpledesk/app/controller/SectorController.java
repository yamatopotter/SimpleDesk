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
import simpledesk.app.domain.dto.sector.SectorDTO;
import simpledesk.app.service.SectorService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/sector")
@Tag(description = "Setores da aplicação", name = "Setor")
@Slf4j
public class SectorController {


    @Autowired
    private SectorService sectorService;

    @Operation(summary = "Buscar todos os setores")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = SectorDTO.class))
    })
    @GetMapping
    public ResponseEntity<List<SectorDTO>> findAll() {
        try {
            log.info("Buscando todos os setores");
            List<SectorDTO> list = sectorService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            log.error("Não foi possível buscar todos os setores");
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Buscar setor pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = SectorDTO.class))
    })
    @GetMapping("/{id}")
    public ResponseEntity<SectorDTO> findById(@PathVariable Long id) {
        log.info("Buscando o setor pelo ID: " + id);

        Optional<SectorDTO> setor = sectorService.findById(id);
        return setor.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());

    }

    @Operation(summary = "Criar setor")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = SectorDTO.class))
    })
    @PostMapping
    public ResponseEntity<SectorDTO> addSector(@RequestBody SectorDTO sector) {
        log.info("Adicionando um novo setor");

        Optional<SectorDTO> newSector = sectorService.addSector(sector);
        return newSector.map(sectorDTO -> ResponseEntity.status(HttpStatus.CREATED).body(sectorDTO))
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Atualizar setor")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = SectorDTO.class))
    })
    @PutMapping
    public ResponseEntity<SectorDTO> updateSector(@RequestBody SectorDTO sector) {
        log.info("Editando o setor de ID: " + sector.id());

        Optional<SectorDTO> sectorUpdate = sectorService.updateSector(sector);
        return sectorUpdate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Deletar setor")
    @ApiResponse(responseCode = "204", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = SectorDTO.class))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<SectorDTO>> hardDeleteSector(@PathVariable Long id) {
        log.info("Deletando o setor de ID: " + id);

        return sectorService.findById(id).isPresent() && sectorService.hardDeleteSector(id) ?
                ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}
