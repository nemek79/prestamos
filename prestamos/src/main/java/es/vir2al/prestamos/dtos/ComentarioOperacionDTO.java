package es.vir2al.prestamos.dtos;

import java.io.Serializable;
import java.util.Date;

import es.vir2al.prestamos.models.ComentarioOperacion;

public class ComentarioOperacionDTO implements Serializable {

	private static final long serialVersionUID = 5158860374761555514L;

	private Long id;
	private String comentario;
	private String fecha;
	
	private OperacionDTO operacion;
	
	public ComentarioOperacionDTO() {
		
	}
	
	public ComentarioOperacionDTO(ComentarioOperacion comentario) throws Exception {
		
		// TODO controlar las fechas
		
		this.id = comentario.getId();
		this.comentario = comentario.getComentario();
		this.fecha = "01/01/1900";
		
		this.operacion = new OperacionDTO(comentario.getOperacion());
		
	}
	
	public ComentarioOperacion asComentarioOperacion() throws Exception {
		
		// TODO revisar fechas
		
		ComentarioOperacion comentario = new ComentarioOperacion();
		
		comentario.setId(this.id);
		comentario.setComentario(this.comentario);
		comentario.setFecha(new Date()); // revisar este campo
		
		comentario.setOperacion(this.operacion.asOperacion());
		
		return comentario;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public String getFecha() {
		return fecha;
	}

	public void setFecha(String fecha) {
		this.fecha = fecha;
	}

	public OperacionDTO getOperacion() {
		return operacion;
	}

	public void setOperacion(OperacionDTO operacion) {
		this.operacion = operacion;
	}
	
}
