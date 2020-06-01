package es.vir2al.prestamos.services.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.prestamos.dtos.EstadoMensualidadDTO;
import es.vir2al.prestamos.dtos.MensualidadDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;
import es.vir2al.prestamos.enums.MensualidadEnum;
import es.vir2al.prestamos.models.Mensualidad;
import es.vir2al.prestamos.repositories.MensualidadesDAO;
import es.vir2al.prestamos.services.MensualidadesService;
import es.vir2al.prestamos.utils.Conversiones;
import es.vir2al.prestamos.utils.Utilidades;

@Service
public class MensualidadesServiceImpl implements MensualidadesService {

	@Autowired
	private MensualidadesDAO mesualidadesDAO;
	
	@Override
	@Transactional(readOnly=true)
	public MensualidadDTO create(MensualidadDTO mensualidad) throws Exception {
		
		Mensualidad mensualidadBD = this.mesualidadesDAO.save(mensualidad.asMensualidad());
		
		return new MensualidadDTO(mensualidadBD);
	}
	
	@Override
	@Transactional(readOnly=false)
	public void setMensualidadActual(PrestamoDTO prestamo) throws Exception {
		
		Mensualidad mensualidadBD = new Mensualidad();

		// si el prestamo está en su mes inicial y se paga mensualidad, es la del mes siguiente
		if (this.isMensualidadInMesCreacion(prestamo.getFechaIni())) {

			int mes = Utilidades.getMesSiguiente();
			mensualidadBD.setMes(mes);

			if (mes == 1) {
				mensualidadBD.setYear(Utilidades.getYearActual() + 1);
			} else {
				mensualidadBD.setYear(Utilidades.getYearActual());
			}

		} else {

			mensualidadBD.setMes(Utilidades.getMesActual());
			mensualidadBD.setYear(Utilidades.getYearActual());

		}
	
		mensualidadBD.setPrestamo(prestamo.asPrestamo());
		
		this.mesualidadesDAO.save(mensualidadBD);
		
	}

	@Override
	public EstadoMensualidadDTO getEstadoMensualidad(PrestamoDTO prestamo, Integer mes, Integer year) throws Exception {
		
		EstadoMensualidadDTO estado = new EstadoMensualidadDTO();
		
		Mensualidad mensualidadBD = this.mesualidadesDAO.findByPrestamoAndMesAndYear(prestamo.asPrestamo(), mes, year).orElse(null);
		
		if (mensualidadBD != null) {
			
			estado.setEstado(MensualidadEnum.PAGADO);
			
		} else {
			
			if (this.isMensualidadInMesCreacion(prestamo.getFechaIni())) {

				// se comprueba si está pagado , aunque estemos en el mes de inicio, es decir
				// si ya se ha pagdo para el siguiente mes
				// p.e. situación común:
				// fecha creacion prestamos día 1 del mes x
				// pago de intereses del siguiente mes x + 1, se hace el día 30 del mes x
				int mesSiguiente = mes + 1;
				int yearAbierto = year;

				if (mesSiguiente == 13 ) {
					mesSiguiente = 1;
					yearAbierto = year + 1;
				}


				mensualidadBD = this.mesualidadesDAO.findByPrestamoAndMesAndYear(prestamo.asPrestamo(), mesSiguiente, yearAbierto).orElse(null);
				
				if (mensualidadBD != null) {

					estado.setEstado(MensualidadEnum.PAGADO);

				} else {

					estado.setEstado(MensualidadEnum.ABIERTO);

				}

			
			} else if (this.isFechaPagoExpired(Utilidades.getDateFromDay(prestamo.getDiaIntereses()))) {
				estado.setEstado(MensualidadEnum.RETRASO);
			} else {
				estado.setEstado(MensualidadEnum.PENDIENTE);
			}
		
		}
		
		
		return estado;
	}

	/**
	 * Comprueba si la fecha del pago de la mensualidad ya ha expirado y va con retraso dentro del mes actual
	 * @param fechaIn
	 * @return
	 * @throws Exception
	 */
	private boolean isFechaPagoExpired(String fechaIn) throws Exception {
		
		String fecha = null;
		int mesActual = Utilidades.getMesActual();
		int yearActual = Utilidades.getYearActual();
		
		// obtener la fecha limite de pago del mes y año actual
		fecha = this.getFechaPagoActual(fechaIn, mesActual, yearActual);

		// Estamos en el mes y año correctos, comprobar si la fecha actual es anterior a la de pago
		Date hoy = new Date();
		Date dateFecha = Conversiones.dateToBD(fecha);
		
		if (hoy.compareTo(dateFecha) <= 0) {
			return false;
		} else {
			return true;
		}		

	}
	
	/**
	 * Obtiene la fecha limite de pago del mes y año actual
	 * @param fechaIn
	 * @param mes
	 * @param year
	 * @return
	 * @throws Exception
	 */
	private String getFechaPagoActual(String fechaIn, Integer mes, Integer year) throws Exception {
	
		String newFecha = fechaIn.substring(0, 2)+"/";
		
		if (mes < 10) {
			newFecha += "0"+mes+"/"+year;
		} else {
			newFecha += mes+"/"+year;
		}
		
		return newFecha;
		
	}

	/**
	 * Comprueba si el prestamo está en el mes de apertura
	 * En tal caso, la mensualidad está abierta, en este mes no se paga mensualidad
	 * @param fechaInicio
	 * @return
	 * @throws Exception
	 */
	private boolean isMensualidadInMesCreacion(String fechaInicio) throws Exception {

		int mesActual = Utilidades.getMesActual();
		String mesInicio = fechaInicio.substring(3, 5);

		Integer mesInicioNum = Integer.parseInt(mesInicio);

		if (mesActual != mesInicioNum) return false;

		return true;
	}
	
}
