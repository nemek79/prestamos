package es.vir2al.prestamos.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Conversiones {

	private static String FORMATO_FECHA = "dd/MM/yyyy";
	
	/**
	 * Convierte las fechas de la base de datos a formato español
	 */
	public static String dateFromBD(Date fechaIn) {
		
		SimpleDateFormat formateador = new SimpleDateFormat(FORMATO_FECHA);
		
		return formateador.format(fechaIn);
		
	}
	
	/**
	 * Convierte las fechas desde el formato español a fecha
	 */
	public static Date dateToBD(String fechaIn) throws ParseException {
		
		SimpleDateFormat formateador = new SimpleDateFormat(FORMATO_FECHA);
		
		return formateador.parse(fechaIn);
		
	}
	
}
