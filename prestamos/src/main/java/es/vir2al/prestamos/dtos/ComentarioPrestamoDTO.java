package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.models.ComentarioPrestamo;
import es.vir2al.prestamos.utils.Conversiones;

public class ComentarioPrestamoDTO implements Serializable {

	private static final long serialVersionUID = -1494423436037799206L;
	
	private Long id;
	private PrestamoDTO prestamo;
	private String comentario;
	private String fecha;
	
	public ComentarioPrestamoDTO() {
		
	}
	
	public ComentarioPrestamoDTO(ComentarioPrestamo comentario) throws Exception {
		
		this.id = comentario.getId();
		
		// el prestamos es obligatorio
		this.prestamo = new PrestamoDTO(comentario.getPrestamo());
		
		this.comentario = comentario.getComentario();
		this.fecha = Conversiones.dateFromBD(comentario.getFecha());
		
	}
	
	public ComentarioPrestamo asComentarioPrestamo() throws Exception {
		
		ComentarioPrestamo comentarioBD = new ComentarioPrestamo();
		
		comentarioBD.setId(this.id);
		comentarioBD.setPrestamo(this.prestamo.asPrestamo());
		comentarioBD.setComentario(this.comentario);
		comentarioBD.setFecha(Conversiones.dateToBD(this.fecha));
		
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
