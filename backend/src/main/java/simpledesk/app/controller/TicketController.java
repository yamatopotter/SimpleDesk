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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.domain.dto.ticket.TicketDTO;
import simpledesk.app.domain.dto.ticket.TicketDataDTO;
import simpledesk.app.service.TicketService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ticket")
@Tag(description = "Tickets da aplicação", name = "Ticket")
@Slf4j
public class TicketController {
    @Autowired
    private TicketService ticketService;

    @Operation(summary = "Buscar todos os tickets")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping
    public ResponseEntity<List<TicketDataDTO>> findAll() {
        try {
            log.info("Buscando todos os ticket's");
            List<TicketDataDTO> list = ticketService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            log.error("Não foi possível buscar todos os ticket's");
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Buscar todos os tickets por tipo de equipamento")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/type/{equipmentTypeName}")
    public ResponseEntity<List<TicketDataDTO>> getTicketsByEquipmentTypeName(@PathVariable String equipmentTypeName) {
        log.info("Buscando todos os tickets por tipo de equipamento por: " + equipmentTypeName);

        List<TicketDataDTO> tickets = ticketService.getTicketsByEquipmentTypeName(equipmentTypeName);
        return tickets.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok().body(tickets);
    }

    @Operation(summary = "Buscar todos os tickets por workflow")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/workflow/{workflow}")
    public ResponseEntity<List<TicketDataDTO>> getTicketsByWorkflow(@PathVariable String workflow) {
        log.info("Buscando todos os tickets por workflow: " + workflow);

        List<TicketDataDTO> tickets = ticketService.getTicketsByWorkflow(workflow);
        return tickets.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok().body(tickets);
    }

    @Operation(summary = "Buscar ticket pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @GetMapping("/{id}")
    public ResponseEntity<TicketDataDTO> findById(@PathVariable Long id) {
        log.info("Buscando o ticket pelo ID: " + id);

        Optional<TicketDataDTO> ticket = ticketService.findById(id);
        return ticket.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Criar um ticket")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<TicketDataDTO> addTicket(@RequestBody TicketDTO ticket) {
        log.info("Adicionando um novo ticket");

        Optional<TicketDataDTO> newTicket = ticketService.addTicket(ticket);
        return newTicket.map(ticketDTO -> ResponseEntity.status(HttpStatus.CREATED).body(ticketDTO))
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Editar um ticket")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<TicketDataDTO> updateTicket(@RequestBody TicketDTO ticket) {
        log.info("Editando o ticket de ID: " + ticket.id());

        Optional<TicketDataDTO> ticketUpdate = ticketService.updateTicket(ticket);
        return ticketUpdate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Deletar ticket")
    @ApiResponse(responseCode = "204", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @SecurityRequirement(name = "Bearer Authentication")
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<TicketDTO>> hardDeleteTicket(@PathVariable Long id) {
        log.info("Deletando o ticket de ID: " + id);

        return ticketService.findById(id).isPresent() && ticketService.hardDeleteTicket(id) ?
                ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


}
