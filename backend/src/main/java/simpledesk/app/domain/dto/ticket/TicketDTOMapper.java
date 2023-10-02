package simpledesk.app.domain.dto.ticket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import simpledesk.app.domain.dto.equipment.EquipmentDTOMapper;
import simpledesk.app.domain.dto.status.StatusDTOMapper;
import simpledesk.app.domain.dto.user.UserDTOMapper;
import simpledesk.app.domain.entity.Ticket;

import java.util.function.Function;

@Service
public class TicketDTOMapper implements Function<Ticket, TicketDataDTO> {
    @Autowired
    UserDTOMapper userDTOMapper;
    @Autowired
    EquipmentDTOMapper equipmentDTOMapper;
    @Autowired
    StatusDTOMapper statusDTOMapper;

    @Override
    public TicketDataDTO apply(Ticket ticket) {
       try {
           return new TicketDataDTO(
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
           return new TicketDataDTO(
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
