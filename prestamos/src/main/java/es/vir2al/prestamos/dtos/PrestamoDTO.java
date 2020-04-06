package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.models.Prestamo;
import es.vir2al.prestamos.utils.Conversiones;

public class PrestamoDTO implements Serializable {

	private static final long serialVersionUID = 1897088512270968270L;
	
	private Long id;
	private String fechaIni;
	private String fechaFin;
	private String importe;
	private String importeInicial;
	private String interes;
	private ClienteDTO cliente;
	private IntermediarioDTO intermediario;
	private EstadoPrestamoDTO estado;
	private String mensualidad; // campo calculado que no está en bbdd
	private Integer diaIntereses;
	
	private EstadoMensualidadDTO estadoMensualidad;
	
	public PrestamoDTO() {
		
	}

	public PrestamoDTO(Prestamo prestamo) throws Exception {
		

		this.id = prestamo.getId();
		this.fechaIni = Conversiones.dateFromBD(prestamo.getFechaIni());
		this.fechaFin = Conversiones.dateFromBD(prestamo.getFechaFin());
		this.importe = Conversiones.formatImporte(prestamo.getImporte());
		this.importeInicial = Conversiones.formatImporte(prestamo.getImporteInicial());
		this.interes = Conversiones.formatPorcentaje(prestamo.getInteres());
		this.diaIntereses = prestamo.getDiaIntereses();
		
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
		
		this.mensualidad = Conversiones.formatImporte(mensualidad);
		
	}
	
	public Prestamo asPrestamo() throws Exception {
		
		Prestamo prestamoBD = new Prestamo();
		
		prestamoBD.setId(this.id);
		prestamoBD.setFechaIni(Conversiones.dateToBD(this.fechaIni));
		prestamoBD.setFechaFin(Conversiones.dateToBD(this.fechaFin));
		prestamoBD.setImporte(Conversiones.importeToNumber(this.importe));
		prestamoBD.setImporteInicial(Conversiones.importeToNumber(this.importeInicial));
		prestamoBD.setInteres(Conversiones.porcentajeToNumber(this.interes));
		
		if (this.diaIntereses != null) {
			prestamoBD.setDiaIntereses(this.diaIntereses);
		} else {
			Integer dia = Integer.parseInt(this.fechaIni.substring(0, 1));
			prestamoBD.setDiaIntereses(dia);
		}

		if (this.cliente != null) {
			
			prestamoBD.setCliente(this.cliente.asCliente());
			
		} else {
			
			throw new Exception("El cliente no puede ser nulo.");
			
		}
		
		if (this.intermediario != null) {
			
			prestamoBD.setIntermediario(this.intermediario.asIntermediario());
			
		} else {
			
			prestamoBD.setIntermediario(null);
			
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

	public String getImporte() {
		return importe;
	}

	public void setImporte(String importe) {
		this.importe = importe;
	}

	public String getImporteInicial() {
		return importeInicial;
	}

	public void setImporteInicial(String importeInicial) {
		this.importeInicial = importeInicial;
	}

	public String getInteres() {
		return interes;
	}

	public void setInteres(String interes) {
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

	public EstadoMensualidadDTO getEstadoMensualidad() {
		return estadoMensualidad;
	}

	public void setEstadoMensualidad(EstadoMensualidadDTO estadoMensualidad) {
		this.estadoMensualidad = estadoMensualidad;
	}

	public Integer getDiaIntereses() {
		return diaIntereses;
	}

	public void setDiaIntereses(Integer diaIntereses) {
		this.diaIntereses = diaIntereses;
	}

	@Override
	public String toString() {
		return "PrestamoDTO [id=" + id + ", fechaIni=" + fechaIni + ", fechaFin=" + fechaFin + ", importe=" + importe
				+ ", importeInicial=" + importeInicial + ", interes=" + interes + ", cliente=" + cliente
				+ ", intermediario=" + intermediario + ", estado=" + estado + ", mensualidad=" + mensualidad
				+ ", diaIntereses=" + diaIntereses + ", estadoMensualidad=" + estadoMensualidad + "]";
	}

}
