package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.prestamos.dtos.EstadoMensualidadDTO;
import es.vir2al.prestamos.dtos.EstadoPrestamoDTO;
import es.vir2al.prestamos.dtos.MensualidadDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;
import es.vir2al.prestamos.models.EstadoPrestamo;
import es.vir2al.prestamos.models.Prestamo;
import es.vir2al.prestamos.repositories.PrestamosDAO;
import es.vir2al.prestamos.services.MensualidadesService;
import es.vir2al.prestamos.services.PrestamosService;
import es.vir2al.prestamos.utils.Conversiones;
import es.vir2al.prestamos.utils.Utilidades;

@Service
public class PrestamosServiceImpl implements PrestamosService {

	@Autowired
	private PrestamosDAO prestamosDAO;

	@Autowired
	private MensualidadesService mensualidadesSRV;

	@Override
	@Transactional(readOnly = true)
	public PrestamoDTO getById(Long id) throws Exception {

		EstadoMensualidadDTO estadoMensualidad = null;

		Prestamo prestamoBD = this.prestamosDAO.findById(id)
				.orElseThrow(() -> new Exception("No se encuentra el prestamo con id: " + id));

		// Calculamos el estado de la mensualidad
		PrestamoDTO prestamo = new PrestamoDTO(prestamoBD);

		estadoMensualidad = this.mensualidadesSRV.getEstadoMensualidad(prestamo, Utilidades.getMesActual(),
				Utilidades.getYearActual());

		prestamo.setEstadoMensualidad(estadoMensualidad);

		return prestamo;
	}

	@Override
	@Transactional(readOnly = true)
	public List<PrestamoDTO> getAll() throws Exception {

		List<PrestamoDTO> lstPrestamos = new ArrayList<PrestamoDTO>();

		Iterable<Prestamo> it = this.prestamosDAO.findAll();

		for (Prestamo prestamo : it) {

			lstPrestamos.add(new PrestamoDTO(prestamo));

		}

		return lstPrestamos;
	}

	@Override
	@Transactional(readOnly = false)
	public PrestamoDTO save(PrestamoDTO prestamo) throws Exception {

		Prestamo prestamoBD = this.prestamosDAO.save(prestamo.asPrestamo());

		return new PrestamoDTO(prestamoBD);
	}

	@Override
	@Transactional(readOnly = false)
	public void delete(PrestamoDTO prestamo) throws Exception {

		this.prestamosDAO.delete(prestamo.asPrestamo());

	}

	@Override
	@Transactional(readOnly = false)
	public void delete(Long id) throws Exception {

		this.prestamosDAO.deleteById(id);

	}

	@Override
	@Transactional(readOnly = true)
	public List<PrestamoDTO> getByEstados(List<EstadoPrestamoDTO> lstEstados) throws Exception {

		PrestamoDTO prestamo = null;
		EstadoMensualidadDTO estadoMensualidad = null;
		List<EstadoPrestamo> lstEstadosBD = new ArrayList<EstadoPrestamo>();
		List<PrestamoDTO> lstPrestamos = new ArrayList<PrestamoDTO>();

		for (EstadoPrestamoDTO estado : lstEstados) {
			lstEstadosBD.add(estado.asEstadoPrestamo());
		}

		List<Prestamo> lstPrestamosBD = this.prestamosDAO.findByEstadoIn(lstEstadosBD);

		for (Prestamo prestamoBD : lstPrestamosBD) {

			// Calculamos el estado de la mensualidad
			prestamo = new PrestamoDTO(prestamoBD);

			estadoMensualidad = this.mensualidadesSRV.getEstadoMensualidad(prestamo, Utilidades.getMesActual(),
					Utilidades.getYearActual());

			prestamo.setEstadoMensualidad(estadoMensualidad);

			lstPrestamos.add(prestamo);

		}

		return lstPrestamos;
	}

	@Override
	public void delete(List<Long> lstPrestamos) throws Exception {

		for (Long idPrestamo : lstPrestamos) {

			this.prestamosDAO.deleteById(idPrestamo);

		}

	}

	@Override
	public Map<String, String> getInfoDashboardFront(List<EstadoPrestamoDTO> lstEstados) throws Exception {
		
		PrestamoDTO prestamo = null;
		EstadoMensualidadDTO estadoMensualidad = null;
		List<EstadoPrestamo> lstEstadosBD = new ArrayList<EstadoPrestamo>();
		Map<String, String> data = new HashMap<String, String>();
		Integer size = 0;
		Float importeTotal = 0f;
		Float interesesMes = 0f;
		Float interesesNetos = 0f;
		Float interesesAbonados = 0f;
		Float interesesAbonadosEsperados = 0f;
		Float interesesRetraso = 0f;
		Float interesesPendientes = 0f;
		Float interesesAbierto = 0f;
		MensualidadDTO mensualidad = null;

		for (EstadoPrestamoDTO estado : lstEstados) {
			lstEstadosBD.add(estado.asEstadoPrestamo());
		}

		List<Prestamo> lstPrestamosBD = this.prestamosDAO.findByEstadoIn(lstEstadosBD);

		// número de prestamos en estado activo
		size = lstPrestamosBD.size();
		data.put("num_prestamos", size.toString());

		for (Prestamo prestamoBD : lstPrestamosBD) {

			// Calculamos el estado de la mensualidad
			prestamo = new PrestamoDTO(prestamoBD);

			estadoMensualidad = this.mensualidadesSRV.getEstadoMensualidad(prestamo, Utilidades.getMesActual(),
					Utilidades.getYearActual());

			prestamo.setEstadoMensualidad(estadoMensualidad);

			importeTotal += prestamoBD.getImporte();
			
			switch (estadoMensualidad.getDescripcion()) {

				case "Abierto":
					interesesAbierto += prestamoBD.getInteresesMesNetos();
					break;
				case "Pendiente":
					interesesPendientes += prestamoBD.getInteresesMesNetos(); 
					interesesMes += prestamoBD.getInteresesMes();
					interesesNetos += prestamoBD.getInteresesMesNetos();
					break;
				case "Pagado":
					interesesAbonadosEsperados += prestamoBD.getInteresesMesNetos(); 

					// calculamos en función de si ya sabemos si nos han pagado

					mensualidad = this.mensualidadesSRV.getActualByPrestamo(prestamo);

					if (mensualidad == null) {
						interesesMes += prestamoBD.getInteresesMes();
						interesesNetos += prestamoBD.getInteresesMesNetos();
					} else {
						interesesMes += mensualidad.getInteresesBrutos(prestamoBD.getIntermediario().getPorcComision());
						interesesNetos += mensualidad.getIntereses();
					}

					break;
				case "Retraso":
					interesesRetraso += prestamoBD.getInteresesMesNetos(); 
					interesesMes += prestamoBD.getInteresesMes();
					interesesNetos += prestamoBD.getInteresesMesNetos();
					break;

			}

		}

 
		data.put("importe_total", Conversiones.formatImporte(importeTotal));
		data.put("intereses_mes", Conversiones.formatImporte(interesesMes));
		data.put("intereses_mes_netos", Conversiones.formatImporte(interesesNetos));
		data.put("intereses_mes_abierto", Conversiones.formatImporte(interesesAbierto));
		data.put("intereses_mes_pendientes", Conversiones.formatImporte(interesesPendientes));
		// obtenemos los intereses pagados reales
		interesesAbonados = this.mensualidadesSRV.getImporteTotalActual();
		// comprobamos si los intereses netos esperados son los que realmente tenemos
		if (interesesAbonadosEsperados != interesesAbonados) {
			data.put("intereses_mes_pagado", "* " + Conversiones.formatImporte(interesesAbonados));
		} else {
			data.put("intereses_mes_pagado", Conversiones.formatImporte(interesesAbonadosEsperados));
		}
		data.put("intereses_mes_retraso", Conversiones.formatImporte(interesesRetraso));

		return data;
	}
	
}
