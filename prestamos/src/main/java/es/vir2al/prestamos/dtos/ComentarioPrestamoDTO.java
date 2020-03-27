package es.vir2al.prestamos.dtos;

import java.io.Serializable;
import java.util.Date;

import es.vir2al.models.ComentarioPrestamo;

public class ComentarioPrestamoDTO implements Serializable {

	private static final long serialVersionUID = -1494423436037799206L;
	
	private Long id;
	private PrestamoDTO prestamo;
	private String comentario;
	private String fecha;
	
	public ComentarioPrestamoDTO() {
		
	}
	
	public ComentarioPrestamoDTO(ComentarioPrestamo comentario) throws Exception {
		
		// TODO obtener la fecha desde el comentario convertida a string
		
		this.id = comentario.getId();
		
		// el prestamos es obligatorio
		this.prestamo = new PrestamoDTO(comentario.getPrestamo());
		
		this.comentario = comentario.getComentario();
		this.fecha = "01/01/1900";
		
	}
	
	public ComentarioPrestamo asComentarioPrestamo() throws Exception {
		
		// TODO revisar la fecha ya que hay que meter la fecha convertida del prestamo
		
		ComentarioPrestamo comentarioBD = new ComentarioPrestamo();
		
		comentarioBD.setId(this.id);
		comentarioBD.setPrestamo(this.prestamo.asPrestamo());
		comentarioBD.setComentario(this.comentario);
		comentarioBD.setFecha(new Date()); // REVISAR!!
		
		return comentarioBD;
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
	
}
