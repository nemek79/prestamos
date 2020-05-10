package es.vir2al.prestamos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.vir2al.prestamos.data.responses.InfoResponse;
import es.vir2al.prestamos.dtos.EstadoPrestamoDTO;
import es.vir2al.prestamos.services.EstadosPrestamoService;

@CrossOrigin(origins = { "http://localhost:4200", "*" })
@RestController
@RequestMapping("/api/maestros")
public class MaestrosController {
    
    @Autowired
    private EstadosPrestamoService estadosPrestamoSRV;

    @GetMapping("/estadosprestamo")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<?> getEstadosPrestamo() {

        InfoResponse response = new InfoResponse();

		try {

			List<EstadoPrestamoDTO> lstEstados = this.estadosPrestamoSRV.getAll();
			response.setTotal(lstEstados.size());
			response.setData(lstEstados);

		} catch (Exception e) {

			e.printStackTrace();
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);

		}

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

}