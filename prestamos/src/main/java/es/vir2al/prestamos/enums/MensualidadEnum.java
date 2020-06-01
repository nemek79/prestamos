package es.vir2al.prestamos.enums;

public enum MensualidadEnum {

	ABIERTO("ABIERTO"),
	PENDIENTE("PENDIENTE"),
	PAGADO("PAGADO"),
	RETRASO("RETRASO");
	
	private String estado;
	
	private MensualidadEnum(String estado) {
		this.estado = estado;
	}

	public String getEstado() {
		return estado;
	}
	
}
