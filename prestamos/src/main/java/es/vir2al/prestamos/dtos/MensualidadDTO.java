package es.vir2al.prestamos.dtos;

import java.io.Serializable;

import es.vir2al.prestamos.models.Mensualidad;

public class MensualidadDTO implements Serializable {

	private static final long serialVersionUID = 4080738853940917818L;
	
	private Long id;
	private PrestamoDTO prestamo;
	private Integer mes;
	private Integer year;
	
	public MensualidadDTO() {
		
	}

	public MensualidadDTO(Mensualidad mensualidad) throws Exception {
		
		this.id = mensualidad.getId();
		this.prestamo = new PrestamoDTO(mensualidad.getPrestamo());
		this.mes = mensualidad.getMes();
		this.year = mensualidad.getYear();
		
	}
	
	public Mensualidad asMensualidad() throws Exception {
		
		Mensualidad mensualidad = new Mensualidad();
		
		mensualidad.setId(this.id);
		mensualidad.setPrestamo(this.prestamo.asPrestamo());
		mensualidad.setMes(this.mes);
		mensualidad.setYear(this.year);
		
		return mensualidad;
		
	}
	
}
