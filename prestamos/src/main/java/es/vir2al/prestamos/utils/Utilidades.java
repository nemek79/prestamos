package es.vir2al.prestamos.utils;

import java.util.Calendar;

public class Utilidades {

	/**
	 * Obtiene el numeral del mes actual
	 * @return
	 */
	public static Integer getMesActual() {
		
		Calendar fecha = Calendar.getInstance();
		
		return fecha.get(Calendar.MONTH) + 1;
	}
	
	/**
	 * Obtiene el año actual
	 * @return
	 */
	public static Integer getYearActual() {
		
		Calendar fecha = Calendar.getInstance();
		
		return fecha.get(Calendar.YEAR);
	}
	
	/**
	 * Obtiene el numeral del mes de una fecha determinada
	 * @param fecha (dd/MM/yyyy)
	 * @return
	 * @throws Exception
	 */
	public static Integer getMesFromDate(String fecha) throws Exception {
		
		return Integer.parseInt(fecha.substring(3, 4));
	}
	
	/**
	 * Obtiene el año de una fecha determinada
	 * @param fecha (dd/MM/yyyy)
	 * @return
	 * @throws Exception
	 */
	public static Integer getYearFromDate(String fecha) throws Exception {
		
		return Integer.parseInt(fecha.substring(6, 9));
	}
	
}
