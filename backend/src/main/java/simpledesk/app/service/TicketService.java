package simpledesk.app.service;

import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.equipment.EquipmentDTO;
import simpledesk.app.DTO.ticket.TicketDTO;
import simpledesk.app.DTO.ticket.TicketDTOMapper;
import simpledesk.app.DTO.ticket.TicketUpdateDTO;
import simpledesk.app.entity.*;
import simpledesk.app.repository.IEquipmentRepositoy;
import simpledesk.app.repository.ITicketRepository;
import simpledesk.app.repository.IUserRepository;

import java.time.LocalDateTime;
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

    public List<TicketDTO> findAll(){

        Stream<TicketDTO> ticket;
        ticket = ticketRepository.findAll().stream().map(ticketDTOMapper);
        return ticket.toList();
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

        Optional<Equipment> equipmentToEquipment;

        equipmentToEquipment = equipmentRepositoy.findById(ticketDTO.equipment().id());


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
                            equipmentToEquipment.get(),
                            LocalDateTime.now()
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

    public Optional<TicketDTO> updateTicket(TicketUpdateDTO ticketDTO) {

        Object principal = SecurityContextHolder.getContext().getAuthentication().getName();
        String idUser = (String) principal;
        Optional<User> userEntity = Optional.of(userRepository.findByEmail(idUser).get());

        Optional<Equipment> equipmentToEquipment;
        Optional<Ticket> ticketAtual;

        equipmentToEquipment = equipmentRepositoy.findById(ticketDTO.equipment().id());
        ticketAtual = ticketRepository.findById(ticketDTO.id());


        if (ticketDTO == null || userEntity.get().getId() != ticketDTO.user().id()) { // Se o ID do user logado for diferente do ID do usuário que abriu o ticket, retorne nulo
            return Optional.of(null);
        } else {
            Ticket ticket = ticketRepository.saveAndFlush(
                    new Ticket(
                            ticketDTO.id(),
                            ticketDTO.title(),
                            ticketDTO.description(),
                            ticketDTO.urlPhoto(),
                            userEntity.get(),
                            equipmentToEquipment.get(),
                            ticketAtual.get().getCreated_at()
                    )
            );
            return Optional.of(ticketDTOMapper.apply(ticketRepository.saveAndFlush(ticket)));
        }
    }




}











