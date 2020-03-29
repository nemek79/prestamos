package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.models.EstadoOperacion;

public class EstadoOperacionDTO implements Serializable {

	private static final long serialVersionUID = -5088054880460215935L;

	private Long id;
	private String descripcion;
	
	public EstadoOperacionDTO() {

	}
	
	public EstadoOperacionDTO(EstadoOperacion estado) {

		this.id = estado.getId();
		this.descripcion = estado.getDescripcion();
		
	}
	
	public EstadoOperacion asEstadoOperacion() {
		
		EstadoOperacion estadoBD = new EstadoOperacion();
		
		estadoBD.setId(this.id);
		estadoBD.setDescripcion(this.descripcion);
		
		return estadoBD;
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	

}
