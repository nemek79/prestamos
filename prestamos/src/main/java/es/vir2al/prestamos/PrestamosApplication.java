package es.vir2al.prestamos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan({"es.vir2al.fwk","es.vir2al.prestamos"})
@SpringBootApplication
public class PrestamosApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrestamosApplication.class, args);
	}

}
