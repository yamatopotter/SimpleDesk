package simpledesk.app.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import simpledesk.app.DTO.sector.SectorDTO;
import simpledesk.app.DTO.sector.SectorDTOMapper;
import simpledesk.app.service.SectorService;

import java.util.List;
import java.util.Optional;

import org.apache.log4j.Logger;

import javax.swing.text.html.Option;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/sector")
@Tag(description = "Setores da aplicação", name = "Setor")
public class SectorController {

    final static Logger log = Logger.getLogger(String.valueOf(SectorController.class));

    @Autowired
    private SectorService sectorService;

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
    @GetMapping("/{id}")
    public ResponseEntity<Optional<SectorDTO>> findById(@PathVariable Long id) {
        try {
            log.info("Buscando o setor pelo ID: " + id);
            Optional<SectorDTO> setor = sectorService.findById(id);

            if (setor.isPresent()) return ResponseEntity.ok(setor);
        } catch (Exception e) {
            log.error("Não foi possível buscar o setor de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

    @PostMapping
    public ResponseEntity addSector(@RequestBody SectorDTO sector) {
        try {
            log.info("Adicionando um novo setor");
            if (sector != null) {
                Optional<SectorDTO> newSector = sectorService.addSector(sector);
                if (newSector.isPresent()) return new ResponseEntity<>(newSector, HttpStatus.CREATED);
            }
        } catch (Exception e) {
            log.error("Não foi possível adicionar o setor");
            return ResponseEntity.badRequest().build();
        }
        return null;
    }

    @PutMapping
    public ResponseEntity<Optional<SectorDTO>> updateSector(@RequestBody SectorDTO sector) {
        try {
            log.info("Editando o setor de ID: " + sector.id());
            if (sector != null) {
                Optional<SectorDTO> sectorUpdate = sectorService.updateSector(sector);
                if (sectorUpdate.isPresent()) return ResponseEntity.ok(sectorUpdate);
            }
        } catch (Exception e) {
            log.error("Não foi possível editar o setor de ID: " + sector.id());
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<SectorDTO>> hardDeleteSector(@PathVariable Long id) {
        try {
            log.info("Deletando o setor de ID: " + id);
            if (sectorService.findById(id).isPresent() && sectorService.hardDeleteSector(id)) return ResponseEntity.noContent().build();
        } catch (Exception e) {
            log.error("Não foi possível deletar o setor de ID: " + id);
            return ResponseEntity.notFound().build();
        }
        return null;
    }

}
