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
import simpledesk.app.domain.dto.workflow.WorkflowDTO;
import simpledesk.app.service.WorkflowService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/workflow")
@Tag(description = "Workflow da aplicação", name = "Workflow")
@Slf4j
public class WorkflowController {

    @Autowired
    private WorkflowService workflowService;

    @Operation(summary = "Buscar todos os workflows")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = WorkflowDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping
    public ResponseEntity<List<WorkflowDTO>> findAll() {
        try {
            log.info("Buscando todos os workflows");
            List<WorkflowDTO> list = workflowService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            log.error("Não foi possível buscar todos os workflows");
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Buscar workflow pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = WorkflowDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @GetMapping("/{id}")
    public ResponseEntity<WorkflowDTO> findById(@PathVariable Long id) {
        log.info("Buscando o workflow pelo ID: " + id);
        Optional<WorkflowDTO> workflow = workflowService.findById(id);
        return workflow.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Criar workflow")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = WorkflowDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PostMapping
    public ResponseEntity<WorkflowDTO> addWorkflow(@RequestBody WorkflowDTO workflow) {
        log.info("Adicionando um novo workflow");
        Optional<WorkflowDTO> newWorkflow = workflowService.addWorkflow(workflow);
        return newWorkflow.map(workflowDTO -> ResponseEntity.status(HttpStatus.CREATED).body(workflowDTO))
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Atualizar workflow")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = WorkflowDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PutMapping
    public ResponseEntity<WorkflowDTO> updateWorkflow(@RequestBody WorkflowDTO workflow) {
        log.info("Editando o workflow de ID: " + workflow.id());
        Optional<WorkflowDTO> workflowUpdate = workflowService.updateWorkflow(workflow);
        return workflowUpdate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Deletar workflow")
    @ApiResponse(responseCode = "204", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = WorkflowDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<WorkflowDTO>> hardDeleteWorkflow(@PathVariable Long id) {
        log.info("Deletando o workflow de ID: " + id);

        return workflowService.findById(id).isPresent() && workflowService.hardDeleteWorkflow(id) ?
                ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }

}
