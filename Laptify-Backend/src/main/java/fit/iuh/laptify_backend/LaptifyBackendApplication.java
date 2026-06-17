package fit.iuh.laptify_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class LaptifyBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LaptifyBackendApplication.class, args);
	}

}
