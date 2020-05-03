package es.vir2al.prestamos.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.vir2al.prestamos.data.responses.DataResponse;
import es.vir2al.prestamos.data.responses.ErrorResponse;
import es.vir2al.prestamos.data.responses.InfoResponse;
import es.vir2al.prestamos.dtos.ClienteDTO;
import es.vir2al.prestamos.services.ClientesService;

/**
 * ClientesController
 */
@CrossOrigin(origins = { "http://localhost:4200", "*" })
@RestController
@RequestMapping("/api/clientes")
public class ClientesController {

	@Autowired
	private ClientesService clientesSRV;

	@GetMapping("")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getClientes() {

		InfoResponse response = new InfoResponse();

		try {

			List<ClienteDTO> lstClientes = this.clientesSRV.getAll();
			response.setTotal(lstClientes.size());
			response.setData(lstClientes);

		} catch (Exception e) {

			e.printStackTrace();
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);

		}

		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	/**
	 * Obtiene el cliente por su id
	 * @return
	 */
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getClientes(
		@PathVariable Long id
	) {

		DataResponse<ClienteDTO> response = new DataResponse<ClienteDTO>();

		try {

			ClienteDTO cliente = this.clientesSRV.getById(id);
			response.setData(cliente);

		} catch (Exception e) {

			List<String> lstErrors = new ArrayList<String>();
			ErrorResponse errorResponse = new ErrorResponse();

			lstErrors.add(e.getMessage());

			errorResponse.setErrors(lstErrors);

			e.printStackTrace();

			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	
		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	/**
	 * Crea o edita el cliente
	 */
	@PostMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> saveCliente(@Valid @RequestBody ClienteDTO clienteIn, BindingResult result) {

		DataResponse<ClienteDTO> response = new DataResponse<ClienteDTO>();

		try {

			ClienteDTO cliente = this.clientesSRV.save(clienteIn);
			response.setData(cliente);

		} catch (Exception e) {

			List<String> lstErrors = new ArrayList<String>();
			ErrorResponse errorResponse = new ErrorResponse();

			lstErrors.add(e.getMessage());

			errorResponse.setErrors(lstErrors);

			e.printStackTrace();

			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	/**
	 * Guarda un nuevo cliente en la base de datos
	 */
	@PostMapping("/delete")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> delClientes(@Valid @RequestBody List<Long> lstClientesIn, BindingResult result) {

		try {
			this.clientesSRV.delete(lstClientesIn);
		} catch (Exception e) {

			List<String> lstErrors = new ArrayList<String>();
			ErrorResponse errorResponse = new ErrorResponse();

			lstErrors.add(e.getMessage());

			errorResponse.setErrors(lstErrors);

			e.printStackTrace();

			return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);

		}

		return new ResponseEntity<>(null, HttpStatus.OK);
	}
    
}