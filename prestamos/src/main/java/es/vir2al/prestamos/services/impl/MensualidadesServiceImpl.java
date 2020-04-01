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
	public EstadoMensualidadDTO getEstadoMensualidad(PrestamoDTO prestamo, Integer mes, Integer year) throws Exception {
		
		EstadoMensualidadDTO estado = new EstadoMensualidadDTO();
		
		Mensualidad mensualidadBD = this.mesualidadesDAO.findByPrestamoAndMesAndYear(prestamo.asPrestamo(), mes, year).orElse(null);
		
		if (mensualidadBD != null) {
			
			estado.setEstado(MensualidadEnum.PAGADO);
			
		} else {
			
			if (this.isFechaPagoExpired(prestamo.getFechaIni())) {
				estado.setEstado(MensualidadEnum.PENDIENTE);
			} else {
				estado.setEstado(MensualidadEnum.RETRASO);
			}
		
		}
		
		
		return estado;
	}

	
	private boolean isFechaPagoExpired(String fechaIn) throws Exception {
		
		String fecha = null;
		int mesActual = Utilidades.getMesActual();
		int yearActual = Utilidades.getYearActual();
		
		// obtener la fecha limite de pago del mes y año actual
		fecha = this.getFechaPagoActual(fechaIn, mesActual, yearActual);

		// Estamos en el mes y año correctos, comprobar si la fecha actual es anterior a la de pago
		Date hoy = new Date();
		Date dateFecha = Conversiones.dateToBD(fecha);
		
		if (hoy.compareTo(dateFecha) > 0) {
			return false;
		} else {
			return true;
		}		

	}
	
	private String getFechaPagoActual(String fechaIn, Integer mes, Integer year) throws Exception {
	
		String newFecha = fechaIn.substring(0, 2)+"/";
		
		if (mes < 10) {
			newFecha += "0"+mes+"/"+year;
		} else {
			newFecha += mes+"/"+year;
		}
		
		return newFecha;
		
	}
	
}
