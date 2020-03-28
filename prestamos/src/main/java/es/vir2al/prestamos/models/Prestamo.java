package es.vir2al.prestamos.models;

import java.util.Date;

import javax.persistence.Column;
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
@Table(name = "t_prestamos")
public class Prestamo extends V2lAudit {

	private static final long serialVersionUID = 8761030907428809698L;

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	@Column(name="fecha_ini")
	private Date fechaIni;
	
	@Column(name="fecha_fin")
	private Date fechaFin;
	
	private Float importe;
	
	@Column(name="importe_inicial")
	private Float importeInicial;
	
	private Float interes;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cliente_id", nullable = false)
	private Cliente cliente;
	
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "intermediario_id", nullable = false)
	private Intermediario intermediario;
	
	private EstadoPrestamo estado;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getFechaIni() {
		return fechaIni;
	}

	public void setFechaIni(Date fechaIni) {
		this.fechaIni = fechaIni;
	}

	public Date getFechaFin() {
		return fechaFin;
	}

	public void setFechaFin(Date fechaFin) {
		this.fechaFin = fechaFin;
	}

	public Float getImporte() {
		return importe;
	}

	public void setImporte(Float importe) {
		this.importe = importe;
	}

	public Float getImporteInicial() {
		return importeInicial;
	}

	public void setImporteInicial(Float importeInicial) {
		this.importeInicial = importeInicial;
	}

	public Float getInteres() {
		return interes;
	}

	public void setInteres(Float interes) {
		this.interes = interes;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	public Intermediario getIntermediario() {
		return intermediario;
	}

	public void setIntermediario(Intermediario intermediario) {
		this.intermediario = intermediario;
	}

	public EstadoPrestamo getEstado() {
		return estado;
	}

	public void setEstado(EstadoPrestamo estado) {
		this.estado = estado;
	}
	
}
