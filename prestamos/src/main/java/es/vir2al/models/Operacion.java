package es.vir2al.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import es.vir2al.fwk.models.V2lAudit;

@Entity
@Table(name = "t_operaciones")
public class Operacion extends V2lAudit {

	private static final long serialVersionUID = -619392705001176637L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "prestamo_id", nullable = false)
	private Prestamo prestamo;
	
	private Date fecha;
	
	private Float importe;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "estado_id", nullable = false)
	private EstadoOperacion estado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Prestamo getPrestamo() {
		return prestamo;
	}

	public void setPrestamo(Prestamo prestamo) {
		this.prestamo = prestamo;
	}

	public Date getFecha() {
		return fecha;
	}

	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}

	public Float getImporte() {
		return importe;
	}

	public void setImporte(Float importe) {
		this.importe = importe;
	}

	public EstadoOperacion getEstado() {
		return estado;
	}

	public void setEstado(EstadoOperacion estado) {
		this.estado = estado;
	}
	
}
