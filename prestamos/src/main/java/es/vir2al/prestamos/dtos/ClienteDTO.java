package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.models.Cliente;

public class ClienteDTO implements Serializable {

	private static final long serialVersionUID = 1629158015169012234L;

	private Long id;
	private String nombre;
	private String apellidos;
	private String comentario;
	private String telefono;
	private String email;
	
	public ClienteDTO() {

	}
	
	public ClienteDTO(Cliente cliente) {

		this.id = cliente.getId();
		this.nombre = cliente.getNombre();
		this.apellidos = cliente.getApellidos();
		this.comentario = cliente.getComentario();
		this.telefono = cliente.getTelefono();
		this.email = cliente.getEmail();
		
	}
	
	public Cliente asCliente() {
		
		Cliente clienteBD = new Cliente();
		
		clienteBD.setId(this.id);
		clienteBD.setNombre(this.nombre);
		clienteBD.setApellidos(this.apellidos);
		clienteBD.setComentario(this.comentario);
		clienteBD.setTelefono(this.telefono);
		clienteBD.setEmail(this.email);
		
		return clienteBD;
		
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
	
}
