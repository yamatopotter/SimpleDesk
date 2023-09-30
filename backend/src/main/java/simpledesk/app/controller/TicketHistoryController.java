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
import simpledesk.app.DTO.ticketHistory.TicketHistoryDTO;
import simpledesk.app.entity.Ticket;
import simpledesk.app.service.TicketHistoryService;
import simpledesk.app.service.TicketService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/ticketHistory")
@Tag(description = "Histórico de ticket's da aplicação", name = "Ticket History")
@Slf4j
public class TicketHistoryController {

    @Autowired
    private TicketHistoryService ticketHistoryService;
    @Autowired
    private TicketService ticketService;

    @Operation(summary = "Buscar todos os ticketsHistorys")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketHistoryDTO.class))
    })
    @GetMapping
    public ResponseEntity<List<TicketHistoryDTO>> findAll() {
        try {
            log.info("Buscando todos os ticketsHistorys");
            List<TicketHistoryDTO> list = ticketHistoryService.findAll();
            return ResponseEntity.ok().body(list);
        } catch (Exception e) {
            log.error("Não foi possível buscar todos os ticketsHistorys");
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Buscar ticketHistory pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketHistoryDTO.class))
    })
    @GetMapping("/{id}")
    public ResponseEntity<TicketHistoryDTO> findById(@PathVariable Long id) {
        log.info("Buscando o ticketHistory pelo ID: " + id);

        Optional<TicketHistoryDTO> ticket = ticketHistoryService.findById(id);
        return ticket.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @Operation(summary = "Buscar ticketHistory pelo ID do ticket")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketHistoryDTO.class))
    })
    @GetMapping("ticket/{id}")
    public ResponseEntity<List<TicketHistoryDTO>> findByTicketId(@PathVariable Long id) {
        try {
            log.info("Buscando o ticketHistory pelo ID do ticket: " + id);
            Ticket ticket = ticketService.findByEntityId(id).get();
            List<TicketHistoryDTO> ticketHistory = ticketHistoryService.findByTicket(ticket);
            return ResponseEntity.ok(ticketHistory);
        } catch (Exception e) {
            log.error("Não foi possível buscar o ticketHistory de ID: " + id);
            return ResponseEntity.notFound().build();
        }
    }

    @Operation(summary = "Criar um ticketHistory")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketHistoryDTO.class))
    })
    @PostMapping
    public ResponseEntity<TicketHistoryDTO> addTicketHistory(@RequestBody TicketHistoryDTO ticket) {
        log.info("Adicionando um novo ticketHistory");

        Optional<TicketHistoryDTO> newTicketHistory = ticketHistoryService.addTicketHistory(ticket);
        return newTicketHistory.map(ticketHistoryDTO -> ResponseEntity.status(HttpStatus.CREATED).body(ticketHistoryDTO))
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Editar um ticketHistory")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketHistoryDTO.class))
    })
    @PutMapping
    public ResponseEntity<TicketHistoryDTO> updateTicketHistory(@RequestBody TicketHistoryDTO ticketDTO) {
        log.info("Editando o ticketHistory de ID: " + ticketDTO.id());

        Optional<TicketHistoryDTO> ticketUpdate = ticketHistoryService.updateTicketHistory(ticketDTO);
        return ticketUpdate.map(ResponseEntity::ok)
                .orElse(ResponseEntity.badRequest().build());
    }

    @Operation(summary = "Deletar ticketHistory")
    @ApiResponse(responseCode = "204", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketHistoryDTO.class))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<TicketHistoryDTO>> hardDeleteTicket(@PathVariable Long id) {
        log.info("Deletando o ticketHistory de ID: " + id);
        return ticketHistoryService.findById(id).isPresent() && ticketHistoryService.hardDeleteTicketHistory(id) ?
                ResponseEntity.noContent().build() : ResponseEntity.notFound().build();
    }


}
