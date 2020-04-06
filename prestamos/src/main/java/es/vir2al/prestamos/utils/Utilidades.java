package es.vir2al.prestamos.utils;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

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
	
	/**
	 * Devuelve la fecha actual en string y formato (dd/MM/yyyy)
	 * @return
	 */
	public static String getDateActual() {
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		return sdf.format(new Date());
	}
	
	/**
	 * Devuelve la fecha a partir del día indicado, con el mes y año actual
	 */
	public static String getDateFromDay(Integer day) throws Exception {
		
		Calendar fecha = Calendar.getInstance();
		fecha.set(Calendar.DAY_OF_MONTH,day);
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		
		return sdf.format(fecha.getTime());
		
	}
	
}
