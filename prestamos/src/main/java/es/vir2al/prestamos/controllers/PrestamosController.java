package es.vir2al.prestamos.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/prestamos")
public class PrestamosController {

	@GetMapping()
	@PreAuthorize("hasRole('USER')")
	public ResponseEntity<?> getAllPrestamos() {
		

		return new ResponseEntity<>("OK",HttpStatus.OK);
		
	}
	
}
