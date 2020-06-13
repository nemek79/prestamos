package es.vir2al.prestamos.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import es.vir2al.prestamos.dtos.ComentarioPrestamoDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;
import es.vir2al.prestamos.services.ComentariosPrestamoService;
import es.vir2al.prestamos.services.EstadosPrestamoService;
import es.vir2al.prestamos.services.MensualidadesService;
import es.vir2al.prestamos.services.PrestamosService;
import es.vir2al.prestamos.utils.Utilidades;

@CrossOrigin(origins = { "http://localhost:4200", "*" })
@RestController
@RequestMapping("/api/prestamos")
public class PrestamosController {

	@Autowired
	private PrestamosService prestamosSRV;

	@Autowired
	private EstadosPrestamoService estadosSRV;

	@Autowired
	private MensualidadesService mensualidadesSRV;

	@Autowired
	private ComentariosPrestamoService comentariosSRV;

	@GetMapping("/dashboard")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getPrestamosDashboard() {

		InfoResponse response = new InfoResponse();

		try {

			List<PrestamoDTO> lstPrestamos = this.prestamosSRV.getByEstados(this.estadosSRV.getAbiertos());
			response.setTotal(lstPrestamos.size());
			response.setData(lstPrestamos);

		} catch (Exception e) {

			e.printStackTrace();
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);

		}

		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	@PostMapping("/pagado/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> setMensualidadPagada(@PathVariable("id") Long id) {

		InfoResponse response = new InfoResponse();

		try {

			this.mensualidadesSRV.setMensualidadActual(this.prestamosSRV.getById(id));

		} catch (Exception e) {

			e.printStackTrace();
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);

		}

		return new ResponseEntity<>(response, HttpStatus.OK);

	}

	@PostMapping("/comentario/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> setComentario(@PathVariable("id") Long id, @RequestBody String comentarioIn) {

		InfoResponse response = new InfoResponse();

		ComentarioPrestamoDTO comentario = new ComentarioPrestamoDTO();

		try {

			comentario.setPrestamo(this.prestamosSRV.getById(id));
			comentario.setComentario(comentarioIn);
			comentario.setFecha(Utilidades.getDateActual());

			this.comentariosSRV.save(comentario);

		} catch (Exception e) {

			e.printStackTrace();
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR); // TODO informar el error

		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	@GetMapping("/{id}")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getPrestamo(@PathVariable("id") Long id) {

		DataResponse<PrestamoDTO> response = new DataResponse<PrestamoDTO>();
		PrestamoDTO prestamo = null;

		try {

			prestamo = this.prestamosSRV.getById(id);
			response.setData(prestamo);

		} catch (Exception e) {

			e.printStackTrace();
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR); // TODO informar el error

		}

		return new ResponseEntity<>(response, HttpStatus.OK);
	}

	/**
	 * Crea o edita el prestamo
	 */
	@PostMapping("")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> savePrestamo(@Valid @RequestBody PrestamoDTO prestamoIn, BindingResult result) {

		DataResponse<PrestamoDTO> response = new DataResponse<PrestamoDTO>();

		try {

			PrestamoDTO prestamo = this.prestamosSRV.save(prestamoIn);
			response.setData(prestamo);

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
	 * Elimina una lista de prestamos
	 */
	@PostMapping("/delete")
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> delPrestamos(@Valid @RequestBody List<Long> lstPrestamosIn, BindingResult result) {

		try {
			this.prestamosSRV.delete(lstPrestamosIn);
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

	/**
	 * Datos para mostrar en el dashboard de entrada del front
	 */
	@GetMapping("/front/dashboard")
	@PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
	public ResponseEntity<?> getFrontDashboardInfo() {

		DataResponse<Map<String, String>> response = new DataResponse<Map<String, String>>();
		Map<String, String> data = new HashMap<String, String>();

		try {

			data = this.prestamosSRV.getInfoDashboardFront(this.estadosSRV.getAbiertos());
			
			response.setData(data);

		} catch (Exception e) {
		
			e.printStackTrace();
			return new ResponseEntity<>("", HttpStatus.INTERNAL_SERVER_ERROR);
		
		}
		
		return new ResponseEntity<>(response, HttpStatus.OK);

	}
}
