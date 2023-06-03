package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.ticket.TicketDTO;
import simpledesk.app.DTO.ticket.TicketDTOMapper;
import simpledesk.app.entity.Equipment;
import simpledesk.app.entity.Status;
import simpledesk.app.entity.Ticket;
import simpledesk.app.entity.User;
import simpledesk.app.repository.IEquipmentRepositoy;
import simpledesk.app.repository.IStatusRepository;
import simpledesk.app.repository.ITicketRepository;
import simpledesk.app.repository.IUserRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Stream;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final ITicketRepository ticketRepository;
    private final TicketDTOMapper ticketDTOMapper;
    private final IEquipmentRepositoy equipmentRepositoy;
    private final IUserRepository userRepository;
    private final IStatusRepository statusRepository;

    public List<TicketDTO> findAll(){

        Stream<TicketDTO> ticket;
        ticket = ticketRepository.findAll().stream().map(ticketDTOMapper);
        return ticket.toList();
    }

    public List<TicketDTO> getTicketsByEquipmentTypeName(String equipmentTypeName) {
        List<TicketDTO> ticket;
        ticket = ticketRepository.findByEquipmentTypeName("%" + equipmentTypeName + "%").stream().map(ticketDTOMapper).toList();
        return ticket;
    }

    public List<TicketDTO> getTicketsByWorkflow(String workflow) {
        List<TicketDTO> ticket;
        ticket = ticketRepository.findByWorkflow("%" + workflow + "%").stream().map(ticketDTOMapper).toList();
        return ticket;
    }

    public Optional<TicketDTO> findById(Long id) {

        Optional<TicketDTO> ticket;
        ticket = ticketRepository.findById(id).map(ticketDTOMapper);
        if (ticket.isPresent()){
            return ticket;
        } else {
            return Optional.of(null);
        }
    }

    public Optional<TicketDTO> addTicket(TicketDTO ticketDTO) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        Optional<User> userEntity = Optional.of(userRepository.findByEmail(idUser).get());

        Optional<Equipment> equipmentToTicket;
        Optional<Status> statusToTicket;

        equipmentToTicket = equipmentRepositoy.findById(ticketDTO.equipment().id());
        statusToTicket = statusRepository.findById(ticketDTO.status().id());


        if (ticketDTO == null) {
            return Optional.of(null);
        } else {
            Ticket ticket = ticketRepository.saveAndFlush(
                    new Ticket(
                            null,
                            ticketDTO.title(),
                            ticketDTO.description(),
                            ticketDTO.urlPhoto(),
                            userEntity.get(),
                            equipmentToTicket.get(),
                            statusToTicket.get()
                    )
            );
            return Optional.of(ticketDTOMapper.apply(ticket));
        }
    }

    public Boolean hardDeleteTicket(Long id) {
        if(ticketRepository.findById(id).isPresent()){
            ticketRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public Optional<TicketDTO> updateTicket(TicketDTO ticketDTO) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        Optional<User> userEntity = Optional.of(userRepository.findByEmail(idUser).get());

        Optional<Equipment> equipmentToTicket;
        Optional<Status> statusToTicket;

        equipmentToTicket = equipmentRepositoy.findById(ticketDTO.equipment().id());
        statusToTicket = statusRepository.findById(ticketDTO.status().id());


        if (ticketDTO == null) {
            return Optional.of(null);
        } else {
            Ticket ticket = ticketRepository.saveAndFlush(
                    new Ticket(
                            ticketDTO.id(),
                            ticketDTO.title(),
                            ticketDTO.description(),
                            ticketDTO.urlPhoto(),
                            userEntity.get(),
                            equipmentToTicket.get(),
                            statusToTicket.get()
                    )
            );
            return Optional.of(ticketDTOMapper.apply(ticketRepository.saveAndFlush(ticket)));
        }
    }




}











