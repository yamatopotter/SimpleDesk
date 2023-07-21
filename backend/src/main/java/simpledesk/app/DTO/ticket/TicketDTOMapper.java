package simpledesk.app.DTO.ticket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simpledesk.app.DTO.equipment.EquipmentDTOMapper;
import simpledesk.app.DTO.status.StatusDTOMapper;
import simpledesk.app.DTO.user.UserDTOMapper;
import simpledesk.app.entity.Ticket;

import java.util.function.Function;

@Service
public class TicketDTOMapper implements Function<Ticket, TicketDTO> {
    @Autowired
    UserDTOMapper userDTOMapper;
    @Autowired
    EquipmentDTOMapper equipmentDTOMapper;
    @Autowired
    StatusDTOMapper statusDTOMapper;

    @Override
    public TicketDTO apply(Ticket ticket) {
       try {
           return new TicketDTO(
                   ticket.getId(),
                   ticket.getTitle(),
                   ticket.getDescription(),
                   ticket.getUrlPhoto(),
                   ticket.getCreated_at(),
                   userDTOMapper.apply(ticket.getUser()),
                   equipmentDTOMapper.apply(ticket.getEquipment()),
                   statusDTOMapper.apply(ticket.getStatus())
           );
       } catch (Exception e) {
           return new TicketDTO(
                   ticket.getId(),
                   ticket.getTitle(),
                   ticket.getDescription(),
                   ticket.getUrlPhoto(),
                   ticket.getCreated_at(),
                   null,
                   null,
                   null
           );
       }
    }
}
