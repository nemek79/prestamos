package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.models.Intermediario;

public class IntermedarioDTO implements Serializable {

	private static final long serialVersionUID = -6671076511431031981L;

	private Long id;
	private String nombre;
	private String apellidos;
	private String comentario;
	private String telefono;
	private String email;
	private Float porcComision;
	
	public IntermedarioDTO() {
	
	}

	public IntermedarioDTO(Intermediario intermediario) {
		
		this.id = intermediario.getId();
		this.nombre = intermediario.getNombre();
		this.apellidos = intermediario.getApellidos();
		this.comentario = intermediario.getComentario();
		this.telefono = intermediario.getTelefono();
		this.email = intermediario.getEmail();
		this.porcComision = intermediario.getPorcComision();
		
	}
	
	public Intermediario asIntermediario() {
		
		Intermediario intermediarioBD = new Intermediario();
		
		intermediarioBD.setId(this.id);
		intermediarioBD.setNombre(this.nombre);
		intermediarioBD.setApellidos(this.apellidos);
		intermediarioBD.setComentario(this.comentario);
		intermediarioBD.setTelefono(this.telefono);
		intermediarioBD.setEmail(this.email);
		intermediarioBD.setPorcComision(this.porcComision);
		
		return intermediarioBD;
		
	}
}
