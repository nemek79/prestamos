package es.vir2al.models;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import es.vir2al.fwk.models.V2lAudit;

@Entity
@Table(name = "t_intermediarios")
public class Intermediario extends V2lAudit {

	private static final long serialVersionUID = -5013019689049275578L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	private String nombre;
	
	private String apellidos;
	
	private String comentario;
	
	private String telefono;
	
	private String email;
	
	@Column(name="porc_comision")
	private Float porcComision;

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
