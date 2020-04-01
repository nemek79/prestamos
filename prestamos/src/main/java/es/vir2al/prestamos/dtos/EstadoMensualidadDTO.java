package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.enums.MensualidadEnum;

public class EstadoMensualidadDTO implements Serializable {

	private static final long serialVersionUID = 5841574862076062115L;
	
	private String descripcion;
	private String color;
	
	public EstadoMensualidadDTO() {
		
	}

	public String getDescripcion() {
		return descripcion;
	}

	public String getColor() {
		return color;
	}
	
	public void setEstado(MensualidadEnum estado) {
		
		switch (estado) {
		
		case PENDIENTE:
			
			this.descripcion = "Pendiente";
			this.color = "warning";
			
			break;

		case PAGADO:
			
			this.descripcion = "Pagado";
			this.color = "success";
			
			break;
			
		case RETRASO:
			
			this.descripcion = "Retraso";
			this.color = "danger";
			
			break;
			
			
		default:
			break;
		}
		
	}

}
