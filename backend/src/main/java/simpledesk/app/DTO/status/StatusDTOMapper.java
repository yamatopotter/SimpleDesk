package simpledesk.app.DTO.status;

import org.springframework.stereotype.Service;
import simpledesk.app.entity.Status;

import java.util.function.Function;

@Service
public class StatusDTOMapper implements Function<Status, StatusDTO> {
    @Override
    public StatusDTO apply(Status status) {
        return new StatusDTO(
                status.getId(),
                status.getName()
        );
    }
}
