package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.models.Intermediario;

public class IntermediarioDTO implements Serializable {

	private static final long serialVersionUID = -6671076511431031981L;

	private Long id;
	private String nombre;
	private String apellidos;
	private String comentario;
	private String telefono;
	private String email;
	private Float porcComision;
	
	public IntermediarioDTO() {
	
	}

	public IntermediarioDTO(Intermediario intermediario) {
		
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

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getApellidos() {
		return apellidos;
	}

	public void setApellidos(String apellidos) {
		this.apellidos = apellidos;
	}

	public String getComentario() {
		return comentario;
	}

	public void setComentario(String comentario) {
		this.comentario = comentario;
	}

	public String getTelefono() {
		return telefono;
	}

	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public Float getPorcComision() {
		return porcComision;
	}

	public void setPorcComision(Float porcComision) {
		this.porcComision = porcComision;
	}
	
	
}
