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
import simpledesk.app.domain.dto.status.StatusDTO;
import simpledesk.app.service.StatusService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/status")
@Tag(description = "Status da aplicação", name = "Status")
@Slf4j
public class StatusController {

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
    public ResponseEntity<StatusDTO> findById(@PathVariable Long id) {
        log.info("Buscando o status pelo ID: " + id);

        Optional<StatusDTO> status = statusService.findById(id);
        return status.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Criar status")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = StatusDTO.class))
    })
    @PostMapping
    public ResponseEntity<StatusDTO> addStatus(@RequestBody StatusDTO status) {
        log.info("Adicionando um novo status");

        Optional<StatusDTO> newStatus = statusService.addStatus(status);
        return newStatus.map(statusDTO -> ResponseEntity.status(HttpStatus.CREATED).body(statusDTO))
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Atualizar status")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = StatusDTO.class))
    })
    @PutMapping
    public ResponseEntity<StatusDTO> updateStatus(@RequestBody StatusDTO status) {
        log.info("Editando o status de ID: " + status.id());

        Optional<StatusDTO> statusUpdate = statusService.updateStatus(status);
        return statusUpdate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Deletar status")
    @ApiResponse(responseCode = "204", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = StatusDTO.class))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<StatusDTO>> hardDeleteStatus(@PathVariable Long id) {
        log.info("Deletando o status de ID: " + id);
        return statusService.findById(id).isPresent() && statusService.hardDeleteStatus(id) ?
                ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


}
