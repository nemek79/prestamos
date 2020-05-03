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
import es.vir2al.prestamos.dtos.IntermediarioDTO;
import es.vir2al.prestamos.services.IntermediariosService;

@CrossOrigin(origins = { "http://localhost:4200", "*" })
@RestController
@RequestMapping("/api/intermediarios")
public class IntermediariosController {
    
    @Autowired
    private IntermediariosService intermediariosSRV;

    /**
     * Obtiene la lista de intermediarios
     * @return
     */
	@GetMapping("")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getIntermediarios() {

		InfoResponse response = new InfoResponse();

		try {

			List<IntermediarioDTO> lstIntermediarios = this.intermediariosSRV.getAll();
			response.setTotal(lstIntermediarios.size());
			response.setData(lstIntermediarios);

		} catch (Exception e) {

			e.printStackTrace();
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);

		}

		return new ResponseEntity<>(response, HttpStatus.OK);

    }
    
	/**
	 * Obtiene el intermediario por su id
	 * @return
	 */
	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getIntermediario(
		@PathVariable Long id
	) {

		DataResponse<IntermediarioDTO> response = new DataResponse<IntermediarioDTO>();

		try {

			IntermediarioDTO intermediario = this.intermediariosSRV.getById(id);
			response.setData(intermediario);

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
	 * Crea o edita el intermediario
	 */
	@PostMapping("")
	@PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> saveIntermediario(@Valid @RequestBody IntermediarioDTO intermediarioIn, 
                                                             BindingResult result) {

		DataResponse<IntermediarioDTO> response = new DataResponse<IntermediarioDTO>();

		try {

			IntermediarioDTO intermediario = this.intermediariosSRV.save(intermediarioIn);
			response.setData(intermediario);

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
	 * Elimina una lista de intermediarios
	 */
	@PostMapping("/delete")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> delIntermediarios(@Valid @RequestBody List<Long> lstClientesIn, BindingResult result) {

		try {
			this.intermediariosSRV.delete(lstClientesIn);
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