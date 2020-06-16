package es.vir2al.prestamos.services;

import es.vir2al.prestamos.dtos.EstadoMensualidadDTO;
import es.vir2al.prestamos.dtos.MensualidadDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;

public interface MensualidadesService {

	public MensualidadDTO create(MensualidadDTO mensualidad) throws Exception;

	/**
	 * Calcula el estado de la mensualidad de un prestamo en el mes
	 * Si está pagado el mes se devuelve "PAGADO"
	 * Si no está pagado:
	 * Si el día actual es menor o igual al vencimiento se devuelve "PENDIENTE"
	 * Si el día actual es mayor al vencimiento se devuelve "RETRASO"
	 * SOLO USAR DENTRO DE UN METODO CON TRANSACCIONALIDAD
	 * @param prestamo
	 * @param mes
	 * @param year
	 * @return "PENDIENTE" , "PAGADO" , "RETRASO"
	 * @throws Exception
	 */
	public EstadoMensualidadDTO getEstadoMensualidad(PrestamoDTO prestamo, Integer mes, Integer year) throws Exception;
	
	public void setMensualidadActual(PrestamoDTO prestamo) throws Exception;

	/**
	 * Obtiene el total de los importes pagandos para un mes/año
	 * @since 0.0.4
	 * @param mes
	 * @param year
	 * @return
	 * @throws Exception
	 */
	public Float getImporteTotalByMesAndYear(Integer mes, Integer year) throws Exception;

	/**
	 * Obtiene el total de los importes pagados para el mes/año actual
	 * @since 0.0.4
	 * @return
	 * @throws Exception
	 */
	public Float getImporteTotalActual() throws Exception;

	/**
	 * Obtiene la mensualidad del mes en curso para el prestamos indicado
	 * @since 0.0.2
	 * @param prestamo
	 * @return MensualidadDTO
	 * @throws Exception
	 */
	public MensualidadDTO getActualByPrestamo(PrestamoDTO prestamo) throws Exception;


	
}
