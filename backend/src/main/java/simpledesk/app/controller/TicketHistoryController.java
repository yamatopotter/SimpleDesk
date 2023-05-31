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
import simpledesk.app.DTO.ticketHistory.TicketHistoryDTO;
import simpledesk.app.service.TicketHistoryService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/ticketHistory")
@Tag(description = "Histórico de ticket's da aplicação", name = "Ticket History")
public class TicketHistoryController {

    final static Logger log = Logger.getLogger(String.valueOf(TicketHistoryController.class));

    @Autowired
    private TicketHistoryService ticketHistoryService;

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
    public ResponseEntity<Optional<TicketHistoryDTO>> findById(@PathVariable Long id) {
        try {
            log.info("Buscando o ticketHistory pelo ID: " + id);
            Optional<TicketHistoryDTO> ticket = ticketHistoryService.findById(id);

            if (ticket.isPresent()) return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            log.error("Não foi possível buscar o ticketHistory de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

    @Operation(summary = "Criar um ticketHistory")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketHistoryDTO.class))
    })
    @PostMapping
    public ResponseEntity addTicketHistory(@RequestBody TicketHistoryDTO ticket) {
        try {
            log.info("Adicionando um novo ticketHistory");
            if (ticket != null) {
                Optional<TicketHistoryDTO> newTicketHistory = ticketHistoryService.addTicketHistory(ticket);
                if (newTicketHistory.isPresent()) return new ResponseEntity<>(newTicketHistory, HttpStatus.CREATED);
            }
        } catch (Exception e) {
            log.error("Não foi possível adicionar o ticketHistory");
            return ResponseEntity.badRequest().build();
        }
        return null;
    }

    @Operation(summary = "Editar um ticketHistory")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketHistoryDTO.class))
    })
    @PutMapping
    public ResponseEntity<Optional<TicketHistoryDTO>> updateTicketHistory(@RequestBody TicketHistoryDTO ticketDTO) {
        try {
            log.info("Editando o ticketHistory de ID: " + ticketDTO.id());
            if (ticketDTO != null) {
                Optional<TicketHistoryDTO> ticketUpdate = ticketHistoryService.updateTicketHistory(ticketDTO);
                if (ticketUpdate.isPresent()) return ResponseEntity.ok(ticketUpdate);
            }
        } catch (Exception e) {
            log.error("Não foi possível editar o ticketHistory de ID: " + ticketDTO.id());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    @Operation(summary = "Deletar ticketHistory")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketHistoryDTO.class))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<TicketHistoryDTO>> hardDeleteTicket(@PathVariable Long id) {
        try {
            log.info("Deletando o ticketHistory de ID: " + id);
            if (ticketHistoryService.findById(id).isPresent() && ticketHistoryService.hardDeleteTicketHistory(id)) return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Não foi possível deletar o ticketHistory de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }


}
