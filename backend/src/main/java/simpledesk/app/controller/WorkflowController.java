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
import simpledesk.app.DTO.status.StatusDTO;
import simpledesk.app.DTO.workflow.WorkflowDTO;
import simpledesk.app.service.WorkflowService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/workflow")
@Tag(description = "Workflow da aplicação", name = "Workflow")
public class WorkflowController {
    final static Logger log = Logger.getLogger(String.valueOf(WorkflowController.class));

    @Autowired
    private WorkflowService workflowService;

    @Operation(summary = "Buscar todos os workflows")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = WorkflowDTO.class))
    })
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
    @GetMapping("/{id}")
    public ResponseEntity<Optional<WorkflowDTO>> findById(@PathVariable Long id) {
        try {
            log.info("Buscando o workflow pelo ID: " + id);
            Optional<WorkflowDTO> workflow = workflowService.findById(id);

            if (workflow.isPresent()) return ResponseEntity.ok(workflow);
        } catch (Exception e) {
            log.error("Não foi possível buscar o workflow de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

    @Operation(summary = "Criar workflow")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = WorkflowDTO.class))
    })
    @PostMapping
    public ResponseEntity addWorkflow(@RequestBody WorkflowDTO workflow) {
        try {
            log.info("Adicionando um novo workflow");
            if (workflow != null) {
                Optional<WorkflowDTO> newWorkflow = workflowService.addWorkflow(workflow);
                if (newWorkflow.isPresent()) return new ResponseEntity<>(newWorkflow, HttpStatus.CREATED);
            }
        } catch (Exception e) {
            log.error("Não foi possível adicionar o workflow");
            return ResponseEntity.badRequest().build();
        }
        return null;
    }

    @Operation(summary = "Atualizar workflow")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = WorkflowDTO.class))
    })
    @PutMapping
    public ResponseEntity<Optional<WorkflowDTO>> updateWorkflow(@RequestBody WorkflowDTO workflow) {
        try {
            log.info("Editando o workflow de ID: " + workflow.id());
            if (workflow != null) {
                Optional<WorkflowDTO> workflowUpdate = workflowService.updateWorkflow(workflow);
                if (workflowUpdate.isPresent()) return ResponseEntity.ok(workflowUpdate);
            }
        } catch (Exception e) {
            log.error("Não foi possível workflow o status de ID: " + workflow.id());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return null;
    }

    @Operation(summary = "Deletar workflow")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = WorkflowDTO.class))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<WorkflowDTO>> hardDeleteStatus(@PathVariable Long id) {
        try {
            log.info("Deletando o workflow de ID: " + id);
            if (workflowService.findById(id).isPresent() && workflowService.hardDeleteWorkflow(id)) return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Não foi possível deletar o workflow de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

}
