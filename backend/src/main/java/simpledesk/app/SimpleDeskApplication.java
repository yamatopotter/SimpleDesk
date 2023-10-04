package simpledesk.app;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.servers.Server;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@SecurityScheme(name = "Bearer Authentication" , scheme = "bearer", type = SecuritySchemeType.HTTP, bearerFormat = "bearer")
@OpenAPIDefinition(
		servers = {
				@Server(url = "/", description = "Default Server URL")
		},
		info = @Info(
				title = "API REST Simples Desk",
				version = "1.0.0",
				description = "API REST Simple Desk",
				contact = @Contact(
						name = "Simple Desk"
				)
		)
)
public class SimpleDeskApplication {

	public static void main(String[] args) {

		SpringApplication.run(SimpleDeskApplication.class, args);
	}

}
