package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.models.Mensualidad;

public class MensualidadDTO implements Serializable {

	private static final long serialVersionUID = 4080738853940917818L;
	
	private Long id;
	private PrestamoDTO prestamo;
	private Integer mes;
	private Integer year;
	private Float intereses;
	
	public MensualidadDTO() {
		
	}

	public MensualidadDTO(Mensualidad mensualidad) throws Exception {
		
		this.id = mensualidad.getId();
		this.prestamo = new PrestamoDTO(mensualidad.getPrestamo());
		this.mes = mensualidad.getMes();
		this.year = mensualidad.getYear();
		this.intereses = mensualidad.getIntereses();

	}
	
	public Mensualidad asMensualidad() throws Exception {
		
		Mensualidad mensualidad = new Mensualidad();
		
		mensualidad.setId(this.id);
		mensualidad.setPrestamo(this.prestamo.asPrestamo());
		mensualidad.setMes(this.mes);
		mensualidad.setYear(this.year);
		mensualidad.setIntereses(this.intereses);

		return mensualidad;
		
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

	public Integer getMes() {
		return mes;
	}

	public void setMes(Integer mes) {
		this.mes = mes;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Float getIntereses() {
		return intereses;
	}

	public void setIntereses(Float intereses) {
		this.intereses = intereses;
	}

}
