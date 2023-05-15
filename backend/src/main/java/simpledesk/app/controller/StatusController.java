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
import simpledesk.app.DTO.sector.SectorDTO;
import simpledesk.app.DTO.status.StatusDTO;
import simpledesk.app.service.StatusService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/status")
@Tag(description = "Status da aplicação", name = "Status")
public class StatusController {

    final static Logger log = Logger.getLogger(String.valueOf(StatusController.class));
    @Autowired
    private StatusService statusService;

    @Operation(summary = "Buscar todos os status")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = StatusDTO.class))
    })
    @GetMapping
    public ResponseEntity<List<StatusDTO>> findAll() {
        try {
            log.info("Buscando todos os status");
            List<StatusDTO> list = statusService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            log.error("Não foi possível buscar todos os status");
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Buscar status pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = StatusDTO.class))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Optional<StatusDTO>> findById(@PathVariable Long id) {
        try {
            log.info("Buscando o status pelo ID: " + id);
            Optional<StatusDTO> status = statusService.findById(id);

            if (status.isPresent()) return ResponseEntity.ok(status);
        } catch (Exception e) {
            log.error("Não foi possível buscar o status de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

    @Operation(summary = "Criar status")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = StatusDTO.class))
    })
    @PostMapping
    public ResponseEntity addStatus(@RequestBody StatusDTO status) {
        try {
            log.info("Adicionando um novo status");
            if (status != null) {
                Optional<StatusDTO> newStatus = statusService.addStatus(status);
                if (newStatus.isPresent()) return new ResponseEntity<>(newStatus, HttpStatus.CREATED);
            }
        } catch (Exception e) {
            log.error("Não foi possível adicionar o status");
            return ResponseEntity.badRequest().build();
        }
        return null;
    }

    @Operation(summary = "Atualizar status")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = StatusDTO.class))
    })
    @PutMapping
    public ResponseEntity<Optional<StatusDTO>> updateStatus(@RequestBody StatusDTO sector) {
        try {
            log.info("Editando o status de ID: " + sector.id());
            if (sector != null) {
                Optional<StatusDTO> statusUpdate = statusService.updateStatus(sector);
                if (statusUpdate.isPresent()) return ResponseEntity.ok(statusUpdate);
            }
        } catch (Exception e) {
            log.error("Não foi possível editar o status de ID: " + sector.id());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return null;
    }

    @Operation(summary = "Deletar status")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = StatusDTO.class))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<StatusDTO>> hardDeleteStatus(@PathVariable Long id) {
        try {
            log.info("Deletando o status de ID: " + id);
            if (statusService.findById(id).isPresent() && statusService.hardDeleteStatus(id)) return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Não foi possível deletar o status de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }


}
