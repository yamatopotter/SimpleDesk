package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import simpledesk.app.domain.dto.status.StatusDTO;
import simpledesk.app.domain.dto.status.StatusDTOMapper;
import simpledesk.app.domain.entity.Status;
import simpledesk.app.domain.entity.Ticket;
import simpledesk.app.domain.entity.TicketHistory;
import simpledesk.app.domain.entity.Workflow;
import simpledesk.app.repository.IStatusRepository;
import simpledesk.app.repository.ITicketHistoryRepository;
import simpledesk.app.repository.ITicketRepository;
import simpledesk.app.repository.IWorkflowRepository;
import simpledesk.app.service.exceptions.DataIntegratyViolationException;
import simpledesk.app.service.exceptions.EmptyAttributeException;
import simpledesk.app.service.exceptions.ObjectNotFoundException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatusService {

    private final StatusDTOMapper mapper;
    private final IStatusRepository repository;
    private final IWorkflowRepository workflowRepository;
    private final ITicketRepository ticketRepository;
    private final ITicketHistoryRepository ticketHistoryRepository;

    @Transactional(readOnly = true)
    public List<StatusDTO> findAll() {
        return repository.findAll().stream().map(mapper).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<StatusDTO> findById(Long id) {
        return Optional.of(repository.findById(id).map(mapper).
                orElseThrow(() -> new ObjectNotFoundException("Status de ID: " + id + " não encontrado.")));
    }

    @Transactional
    public Optional<StatusDTO> addStatus(StatusDTO status) {
        emptyAttribute(status);
        findByName(status);

        Workflow workflowToStatus;
        workflowToStatus = workflowRepository.findById(status.workflow().id())
                .orElseThrow(() -> new ObjectNotFoundException("Workflow de ID: " + status.workflow().id() + " não foi encontrado."));

        Status statusEntity = repository.save(new Status(null, status.name(), workflowToStatus));
        return Optional.of(mapper.apply(statusEntity));
    }

    @Transactional
    public Optional<StatusDTO> updateStatus(StatusDTO status) {
        emptyAttributeUpdate(status);
        statusExists(status);
        findByName(status);

        Workflow workflowToStatus;
        workflowToStatus = workflowRepository.findById(status.workflow().id())
                .orElseThrow(() -> new ObjectNotFoundException("Workflow de ID: " + status.workflow().id() + " não foi encontrado."));

        Status statusUpdate = repository.save(new Status(status.id(), status.name(), workflowToStatus));
        return Optional.of(mapper.apply(statusUpdate));
    }

    @Transactional
    public Boolean hardDeleteStatus(Long id) {
        validatingTheIntegrityOfTheRelationship(id);
        if (repository.findById(id).isPresent()) {
            repository.deleteById(id);
            return true;
        }
        return false;
    }

    @Transactional(readOnly = true)
    public void validatingTheIntegrityOfTheRelationship(Long id) {
        Status status = repository.findById(id)
                .orElseThrow(() -> new ObjectNotFoundException("Status de ID: " + id + " não encontrado."));

        List<TicketHistory> ticketHistories = ticketHistoryRepository.findByStatus(status);

        for (TicketHistory history : ticketHistories) {
            if (history.getStatus().getId().equals(status.getId()))
                throw new DataIntegratyViolationException("O status está vinculado a um ticket history.");
        }

        List<Ticket> tickets = ticketRepository.findByStatus(status);

        for (Ticket ticket : tickets) {
            if (ticket.getStatus().getId().equals(status.getId()))
                throw new DataIntegratyViolationException("O status está vinculado a um ticket.");
        }

    }

    @Transactional(readOnly = true)
    public void statusExists(StatusDTO statusDTO) {
        Optional<Status> status = repository.findById(statusDTO.id());
        if (status.isEmpty())
            throw new ObjectNotFoundException("O status de ID: " + statusDTO.id() + " não existe.");
    }

    @Transactional(readOnly = true)
    public void findByName(StatusDTO statusDTO) {
        Optional<Status> status = repository.findByName(statusDTO.name());
        if (status.isPresent() && !status.get().getId().equals(statusDTO.id()))
            throw new DataIntegratyViolationException("Status já cadastrado.");
    }


    public void emptyAttribute(StatusDTO statusDTO) {
        if (statusDTO.name().isEmpty() || statusDTO.workflow() == null || statusDTO.workflow().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }

    public void emptyAttributeUpdate(StatusDTO statusDTO) {
        if (statusDTO.id() == null || statusDTO.name().isEmpty() || statusDTO.workflow() == null || statusDTO.workflow().id() == null)
            throw new EmptyAttributeException("Todos os atríbutos são necessários");
    }

}











