package es.vir2al.prestamos.utils;

import java.text.DecimalFormat;
import java.text.DecimalFormatSymbols;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Conversiones {

	private static String FORMATO_FECHA = "dd/MM/yyyy";
	
	/**
	 * Convierte las fechas de la base de datos a formato español
	 */
	public static String dateFromBD(Date fechaIn) {
		
		// si la fecha es nula devolvemos un nulo
		if (fechaIn == null) return null;

		SimpleDateFormat formateador = new SimpleDateFormat(FORMATO_FECHA);
		
		return formateador.format(fechaIn);
		
	}
	
	/**
	 * Convierte las fechas desde el formato español a fecha
	 */
	public static Date dateToBD(String fechaIn) throws ParseException {

		// si la fecha es nula devuelve un nulo
		if (fechaIn == null || fechaIn.trim().isEmpty()) return null;
		
		SimpleDateFormat formateador = new SimpleDateFormat(FORMATO_FECHA);
		
		return formateador.parse(fechaIn);
		
	}
	
	/**
	 * Formatea una cifra a formato euros
	 * @param f
	 * @return
	 * @throws Exception
	 */
	public static String formatImporte(Float f) throws Exception {
		
		if (f == null) return null;

		DecimalFormatSymbols simbolos = new DecimalFormatSymbols();
		simbolos.setDecimalSeparator(',');
		simbolos.setGroupingSeparator('.');

    	String pattern = "###,###,##0.00";
		DecimalFormat myFormatter = new DecimalFormat(pattern,simbolos);

    	String output = myFormatter.format(f);
    	
    	output += " €";
    	
    	return output;
		
	}
	
	/**
	 * Formatea una cifra a formato porcentaje
	 * @param f
	 * @return
	 * @throws Exception
	 */
	public static String formatPorcentaje(Float f) throws Exception {
		
		if (f == null) return null;

		DecimalFormatSymbols simbolos = new DecimalFormatSymbols();
		simbolos.setDecimalSeparator(',');
		simbolos.setGroupingSeparator('.');

    	String pattern = "#0.00";
    	DecimalFormat myFormatter = new DecimalFormat(pattern,simbolos);
    	String output = myFormatter.format(f);
    	
    	output += " %";
    	
    	return output;
		
	}
	
	/**
	 * Convierte un importe formateado en moneda a valor numérico
	 * @param importe
	 * @return
	 * @throws Exception
	 */
	public static Float importeToNumber(String importe) throws Exception {
		
		if (importe == null) return null;

		importe = importe.replace("€", "");
		importe = importe.replace(".", "");
		importe = importe.replace(",", ".");
		importe.trim();

		return Float.valueOf(importe);
		
	}
	
	/**
	 * Convierte un importe formateado en porcentaje a valor numérico
	 * @param importe
	 * @return
	 * @throws Exception
	 */
	public static Float porcentajeToNumber(String importe) throws Exception {
		
		if (importe == null) return null;

		importe = importe.replace("%", "");
		importe = importe.replace(".", "");
		importe = importe.replace(",", ".");
		importe.trim();

		return Float.valueOf(importe);
		
	}
	

}
