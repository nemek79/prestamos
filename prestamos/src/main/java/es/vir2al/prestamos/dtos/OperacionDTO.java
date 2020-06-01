package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.models.Operacion;
import es.vir2al.prestamos.utils.Conversiones;

public class OperacionDTO implements Serializable {

	private static final long serialVersionUID = 1L;
	
	private Long id;
	private PrestamoDTO prestamo;
	private String fecha;
	private Float importe;
	private MetodoPagoDTO metodo;
	private EstadoOperacionDTO estado;
	
	public OperacionDTO() {

	}

	public OperacionDTO(Operacion operacion) throws Exception {

		this.id = operacion.getId();
		this.prestamo = new PrestamoDTO(operacion.getPrestamo());
		this.fecha = Conversiones.dateFromBD(operacion.getFecha());
		this.importe = operacion.getImporte();
		this.metodo = new MetodoPagoDTO(operacion.getMetodo());
		this.estado = new EstadoOperacionDTO(operacion.getEstado());
		
	}
	
	public Operacion asOperacion() throws Exception {
		
		Operacion operacionBD = new Operacion();
		
		operacionBD.setId(this.id);
		operacionBD.setPrestamo(this.prestamo.asPrestamo());
		operacionBD.setFecha(Conversiones.dateToBD(this.fecha));
		operacionBD.setImporte(this.importe);
		operacionBD.setMetodo(this.metodo.asMetodoPago());
		operacionBD.setEstado(this.estado.asEstadoOperacion());
		
		return operacionBD;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public PrestamoDTO getPrestamo() {
		return prestamo;
	}

	public void setPrestamo(PrestamoDTO prestamo) {
		this.prestamo = prestamo;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public Float getImporte() {
		return importe;
	}

	public void setImporte(Float importe) {
		this.importe = importe;
	}

	public MetodoPagoDTO getMetodo() {
		return metodo;
	}

	public void setMetodo(MetodoPagoDTO metodo) {
		this.metodo = metodo;
	}

	public EstadoOperacionDTO getEstado() {
		return estado;
	}

	public void setEstado(EstadoOperacionDTO estado) {
		this.estado = estado;
	}
	
}
