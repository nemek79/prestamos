package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.models.Prestamo;
import es.vir2al.prestamos.utils.Conversiones;

public class PrestamoDTO implements Serializable {

	private static final long serialVersionUID = 1897088512270968270L;
	
	private Long id;
	private String fechaIni;
	private String fechaFin;
	private Float importe;
	private Float importeInicial;
	private Float interes;
	private ClienteDTO cliente;
	private IntermediarioDTO intermediario;
	private EstadoPrestamoDTO estado;
	private String mensualidad; // campo calculado que no está en bbdd
	
	public PrestamoDTO() {
		
	}

	public PrestamoDTO(Prestamo prestamo) throws Exception {
		
		this.id = prestamo.getId();
		this.fechaIni = Conversiones.dateFromBD(prestamo.getFechaIni());
		this.fechaFin = Conversiones.dateFromBD(prestamo.getFechaFin());
		this.importe = prestamo.getImporte();
		this.importeInicial = prestamo.getImporteInicial();
		this.interes = prestamo.getInteres();
		
		if (prestamo.getCliente() != null) {
			
			this.cliente = new ClienteDTO(prestamo.getCliente());
			
		} else {
			
			throw new Exception("El cliente es obligatorio.");
			
		}
		
		if (prestamo.getIntermediario() != null) {
			
			this.intermediario = new IntermediarioDTO(prestamo.getIntermediario());
			
		} else {
			
			this.intermediario = null;
			
		}
		
		if (prestamo.getEstado() != null) {
			
			this.estado = new EstadoPrestamoDTO(prestamo.getEstado());
			
		} else {
			
			throw new Exception("El estado no es correcto.");
			
		}
		
		// calcular la mensualidad
		Float mensualidad = 0f;
		
		mensualidad = prestamo.getImporte() * prestamo.getInteres() / 100;
		
		if (intermediario != null && intermediario.getPorcComision() != null && intermediario.getPorcComision() > 0) {
			mensualidad -= mensualidad * intermediario.getPorcComision() / 100;
		}
		
		this.mensualidad = Float.toString(mensualidad); // TODO convertir a una cadena formateada con una función general
		
	}
	
	public Prestamo asPrestamo() throws Exception {
		
		Prestamo prestamoBD = new Prestamo();
		
		prestamoBD.setId(this.id);
		prestamoBD.setFechaIni(Conversiones.dateToBD(this.fechaIni));
		prestamoBD.setFechaFin(Conversiones.dateToBD(this.fechaFin));
		prestamoBD.setImporte(this.importe);
		prestamoBD.setImporteInicial(this.importeInicial);
		prestamoBD.setInteres(this.interes);
		
		if (this.cliente != null) {
			
			prestamoBD.setCliente(this.cliente.asCliente());
			
		} else {
			
			throw new Exception("El cliente no puede ser nulo.");
			
		}
		
		if (this.intermediario != null) {
			
			prestamoBD.setIntermediario(this.intermediario.asIntermediario());
			
		} else {
			
			prestamoBD.setInteres(null);
			
		}
		
		if (this.estado != null) {
			
			prestamoBD.setEstado(this.estado.asEstadoPrestamo());
			
		} else {
			
			throw new Exception("El estado no puede ser nulo");
			
		}
		
		return prestamoBD;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getFechaIni() {
		return fechaIni;
	}

	public void setFechaIni(String fechaIni) {
		this.fechaIni = fechaIni;
	}

	public String getFechaFin() {
		return fechaFin;
	}

	public void setFechaFin(String fechaFin) {
		this.fechaFin = fechaFin;
	}

	public Float getImporte() {
		return importe;
	}

	public void setImporte(Float importe) {
		this.importe = importe;
	}

	public Float getImporteInicial() {
		return importeInicial;
	}

	public void setImporteInicial(Float importeInicial) {
		this.importeInicial = importeInicial;
	}

	public Float getInteres() {
		return interes;
	}

	public void setInteres(Float interes) {
		this.interes = interes;
	}

	public ClienteDTO getCliente() {
		return cliente;
	}

	public void setCliente(ClienteDTO cliente) {
		this.cliente = cliente;
	}

	public IntermediarioDTO getIntermediario() {
		return intermediario;
	}

	public void setIntermediario(IntermediarioDTO intermediario) {
		this.intermediario = intermediario;
	}

	public EstadoPrestamoDTO getEstado() {
		return estado;
	}

	public void setEstado(EstadoPrestamoDTO estado) {
		this.estado = estado;
	}

	public String getMensualidad() {
		return mensualidad;
	}

}
