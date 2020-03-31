package es.vir2al.prestamos.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import es.vir2al.prestamos.data.responses.InfoResponse;
import es.vir2al.prestamos.dtos.ClienteDTO;
import es.vir2al.prestamos.dtos.EstadoOperacionDTO;
import es.vir2al.prestamos.dtos.EstadoPrestamoDTO;
import es.vir2al.prestamos.dtos.IntermediarioDTO;
import es.vir2al.prestamos.dtos.MetodoPagoDTO;
import es.vir2al.prestamos.dtos.OperacionDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;
import es.vir2al.prestamos.services.ClientesService;
import es.vir2al.prestamos.services.EstadosOperacionesService;
import es.vir2al.prestamos.services.EstadosPrestamoService;
import es.vir2al.prestamos.services.IntermediariosService;
import es.vir2al.prestamos.services.MetodosPagoService;
import es.vir2al.prestamos.services.OperacionesService;
import es.vir2al.prestamos.services.PrestamosService;
import es.vir2al.prestamos.utils.Conversiones;

@RestController
@RequestMapping("/api/test")
public class TestController {

	@Autowired
	private IntermediariosService intermediariosSRV;
	
	@Autowired
	private ClientesService clientesSRV;
	
	@Autowired
	private EstadosPrestamoService estadosPrestamoSRV;
	
	@Autowired
	private PrestamosService prestamosSRV;
	
	@Autowired
	private OperacionesService operacionesSRV;
	
	@Autowired
	private EstadosOperacionesService estadosOperacionesSRV;
	
	@Autowired
	private MetodosPagoService metodosPagoSRV;
	
	@GetMapping()
	@PreAuthorize("hasRole('ADMIN')")
	public ResponseEntity<?> test() {
		
		InfoResponse result = new InfoResponse();
		
		try {
			
			List<OperacionDTO> lstData = this.getOperacionesByPrestamo(20L);
			
			result.setData(lstData);
			result.setIndex(0);
			result.setOffset(0);
			result.setTotal(lstData.size());

			return new ResponseEntity<>(result, HttpStatus.OK);
			
		} catch ( Exception e ) {
		
			e.printStackTrace();
			
			return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
		
	}
	
	private IntermediarioDTO createIntermediario() throws Exception {
		
		IntermediarioDTO intermediario = new IntermediarioDTO();
		
		intermediario.setNombre("Edwin");
		intermediario.setApellidos("Cruz Villalobos");
		intermediario.setPorcComision(20f);
		intermediario.setTelefono("654231564");
		intermediario.setComentario("Principal intermediario");
		
		return this.intermediariosSRV.save(intermediario);
		
	}
	
	private IntermediarioDTO updateIntermediario() throws Exception {
		
		IntermediarioDTO intermediario = null;
		
		intermediario = this.intermediariosSRV.getById(1L);
		
		intermediario.setApellidos("Villalobos Cruz");
		
		this.intermediariosSRV.save(intermediario);
		
		return intermediario;
		
	}
	
	private ClienteDTO createCliente() throws Exception {
		
		ClienteDTO cliente = new ClienteDTO();
		
		cliente.setNombre("Anónimo");
		cliente.setComentario("Cliente desconocido, a través de intermediario");
		
		cliente = this.clientesSRV.save(cliente);
		
		return cliente;
		
	}
	
	private PrestamoDTO crearPrestamos() throws Exception {
		
		IntermediarioDTO intermediario = null;
		ClienteDTO cliente = null;
		EstadoPrestamoDTO estado = null;
		
		PrestamoDTO prestamo = new PrestamoDTO();
		
		intermediario = this.intermediariosSRV.getById(1L);
		cliente = this.clientesSRV.getById(1L);
		estado = this.estadosPrestamoSRV.getById(1L);
		
		prestamo.setImporte(Conversiones.formatImporte(1000f));
		prestamo.setInteres(Conversiones.formatImporte(6f));
		prestamo.setIntermediario(intermediario);
		prestamo.setCliente(cliente);
		prestamo.setEstado(estado);
		prestamo.setImporteInicial(Conversiones.formatImporte(1000f));
		prestamo.setFechaIni("07/01/2020");
		prestamo.setFechaFin("14/06/2020");
		
		return this.prestamosSRV.save(prestamo);
		
	}
	
	private PrestamoDTO getPrestamo(Long id) throws Exception {
		
		return this.prestamosSRV.getById(id);
		
	}
	
	private void asociarOperaciones(Long prestamoId) throws Exception {
		
		PrestamoDTO prestamo = null;
		OperacionDTO operacion = null;
		EstadoOperacionDTO estado = null;
		MetodoPagoDTO metodo = null;
		
		// obtenemos el prestamo
		prestamo = this.prestamosSRV.getById(prestamoId);
		
		// obtener el estado
		estado = this.estadosOperacionesSRV.getById(1L);
		
		// obtener el metodo de pago
		metodo = this.metodosPagoSRV.getById(1L);
		
		// creamos la operacion
		operacion = new OperacionDTO();
		
		operacion.setFecha("29/03/2020");
		operacion.setImporte(1000F);
		operacion.setPrestamo(prestamo);
		operacion.setEstado(estado);
		operacion.setMetodo(metodo);
		
		this.operacionesSRV.save(operacion);
		
	}
	
	private List<OperacionDTO> getOperacionesByPrestamo(Long prestamoId) throws Exception {
		
		PrestamoDTO prestamo = this.prestamosSRV.getById(prestamoId);
		
		List<OperacionDTO> lstOperaciones = this.operacionesSRV.getByPrestamo(prestamo);
		
		return lstOperaciones;
		
	}
	
}
