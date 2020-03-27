package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.models.MetodoPago;

public class MetodoPagoDTO implements Serializable {

	private static final long serialVersionUID = -7599067252705113062L;
	
	private Long id;
	private String descripcion;
	
	public MetodoPagoDTO() {
	
	}
	
	public MetodoPagoDTO(MetodoPago metodo) {
		
		this.id = metodo.getId();
		this.descripcion = metodo.getDescripcion();
		
	}
	
	public MetodoPago asMetodoPago() {
		
		MetodoPago metodoBD = new MetodoPago();
		
		metodoBD.setId(this.id);
		metodoBD.setDescripcion(this.descripcion);
		
		return metodoBD;
		
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
