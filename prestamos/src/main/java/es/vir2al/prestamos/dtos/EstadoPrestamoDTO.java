package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.models.EstadoPrestamo;

public class EstadoPrestamoDTO implements Serializable {

	private static final long serialVersionUID = 425997285624671071L;

	private Long id;
	private String descripcion;
	
	public EstadoPrestamoDTO() {
	
	}

	public EstadoPrestamoDTO(EstadoPrestamo estado) {
		
		this.id = estado.getId();
		this.descripcion = estado.getDescripcion();
		
	}
	
	public EstadoPrestamo asEstadoPrestamo() {
		
		EstadoPrestamo estadoBD = new EstadoPrestamo();
		
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
