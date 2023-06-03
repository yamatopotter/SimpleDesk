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
import simpledesk.app.DTO.ticket.TicketDTO;
import simpledesk.app.service.TicketService;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/ticket")
@Tag(description = "Tickets da aplicação", name = "Ticket")
public class TicketController {
    final static Logger log = Logger.getLogger(String.valueOf(TicketController.class));
    @Autowired
    private TicketService ticketService;

    @Operation(summary = "Buscar todos os tickets")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @GetMapping
    public ResponseEntity<List<TicketDTO>> findAll() {
        try {
            log.info("Buscando todos os ticket's");
            List<TicketDTO> list = ticketService.findAll();
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
    @GetMapping("/type/{equipmentTypeName}")
    public ResponseEntity<List<TicketDTO>> getTicketsByEquipmentTypeName(@PathVariable String equipmentTypeName) {

       log.info("Buscando todos os tickets por tipo de equipamento por: " + equipmentTypeName);
       if (ticketService.getTicketsByEquipmentTypeName(equipmentTypeName).isEmpty()){
           return ResponseEntity.notFound().build();
       } else {
           return ResponseEntity.ok().body(ticketService.getTicketsByEquipmentTypeName(equipmentTypeName));
       }

    }

    @Operation(summary = "Buscar todos os tickets por workflow")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @GetMapping("/workflow/{workflow}")
    public ResponseEntity<List<TicketDTO>> getTicketsByWorkflow(@PathVariable String workflow) {

        log.info("Buscando todos os tickets por workflow: " + workflow);
        if (ticketService.getTicketsByWorkflow(workflow).isEmpty()){
            return ResponseEntity.notFound().build();
        } else {
            return ResponseEntity.ok().body(ticketService.getTicketsByWorkflow(workflow));
        }

    }

    @Operation(summary = "Buscar ticket pelo ID")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @GetMapping("/{id}")
    public ResponseEntity<Optional<TicketDTO>> findById(@PathVariable Long id) {
        try {
            log.info("Buscando o ticket pelo ID: " + id);
            Optional<TicketDTO> ticket = ticketService.findById(id);

            if (ticket.isPresent()) return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            log.error("Não foi possível buscar o ticket de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

    @Operation(summary = "Criar um ticket")
    @ApiResponse(responseCode = "201", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @PostMapping
    public ResponseEntity addTicket(@RequestBody TicketDTO ticket) {
        try {
            log.info("Adicionando um novo ticket");
            if (ticket != null) {
                Optional<TicketDTO> newTicket = ticketService.addTicket(ticket);
                if (newTicket.isPresent()) return new ResponseEntity<>(newTicket, HttpStatus.CREATED);
            }
        } catch (Exception e) {
            log.error("Não foi possível adicionar o ticket");
            return ResponseEntity.badRequest().build();
        }
        return null;
    }

    @Operation(summary = "Editar um ticket")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @PutMapping
    public ResponseEntity<Optional<TicketDTO>> updateTicket(@RequestBody TicketDTO ticket) {
        try {
            log.info("Editando o ticket de ID: " + ticket.id());
            if (ticket != null) {
                Optional<TicketDTO> ticketUpdate = ticketService.updateTicket(ticket);
                if (ticketUpdate.isPresent()) return ResponseEntity.ok(ticketUpdate);
            }
        } catch (Exception e) {
            log.error("Não foi possível editar o ticket de ID: " + ticket.id());
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    @Operation(summary = "Deletar ticket")
    @ApiResponse(responseCode = "200", description = "Sucesso", content = {
            @Content(mediaType = "application/json", schema = @Schema(implementation = TicketDTO.class))
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<TicketDTO>> hardDeleteTicket(@PathVariable Long id) {
        try {
            log.info("Deletando o ticket de ID: " + id);
            if (ticketService.findById(id).isPresent() && ticketService.hardDeleteTicket(id)) return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Não foi possível deletar o ticket de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }


}
