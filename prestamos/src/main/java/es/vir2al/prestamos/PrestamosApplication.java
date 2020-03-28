package es.vir2al.prestamos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan({"es.vir2al.fwk","es.vir2al.prestamos"})
public class PrestamosApplication {

	public static void main(String[] args) {
		SpringApplication.run(PrestamosApplication.class, args);
	}

}
