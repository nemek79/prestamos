package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.prestamos.dtos.EstadoPrestamoDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;
import es.vir2al.prestamos.models.EstadoPrestamo;
import es.vir2al.prestamos.models.Prestamo;
import es.vir2al.prestamos.repositories.PrestamosDAO;
import es.vir2al.prestamos.services.PrestamosService;

@Service
public class PrestamosServiceImpl implements PrestamosService {

	@Autowired
	private PrestamosDAO prestamosDAO;
	
	
	@Override
	@Transactional(readOnly=true)
	public PrestamoDTO getById(Long id) throws Exception {
		
		Prestamo prestamo = this.prestamosDAO.findById(id).orElseThrow(
				() -> new Exception("No se encuentra el prestamo con id: "+id)
		);
		
		return new PrestamoDTO(prestamo);
	}

	@Override
	@Transactional(readOnly=true)
	public List<PrestamoDTO> getAll() throws Exception {
		
		List<PrestamoDTO> lstPrestamos = new ArrayList<PrestamoDTO>();
		
		Iterable<Prestamo> it = this.prestamosDAO.findAll();
		
		for (Prestamo prestamo : it) {
			
			lstPrestamos.add(new PrestamoDTO(prestamo));
			
		}
		
		return lstPrestamos;
	}

	@Override
	@Transactional(readOnly=false)
	public PrestamoDTO save(PrestamoDTO prestamo) throws Exception {
		
		Prestamo prestamoBD = this.prestamosDAO.save(prestamo.asPrestamo());
		
		return new PrestamoDTO(prestamoBD);
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(PrestamoDTO prestamo) throws Exception {
		
		this.prestamosDAO.delete(prestamo.asPrestamo());
		
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(Long id) throws Exception {

		this.prestamosDAO.deleteById(id);
		
	}

	@Override
	@Transactional(readOnly=true)
	public List<PrestamoDTO> getByEstados(List<EstadoPrestamoDTO> lstEstados) throws Exception {
		
		List<EstadoPrestamo> lstEstadosBD = new ArrayList<EstadoPrestamo>();
		List<PrestamoDTO> lstPrestamos = new ArrayList<PrestamoDTO>();
		
		for (EstadoPrestamoDTO estado : lstEstados) {
			lstEstadosBD.add(estado.asEstadoPrestamo());
		}
		
		List<Prestamo> lstPrestamosBD = this.prestamosDAO.findByEstadoIn(lstEstadosBD);
		
		for (Prestamo prestamo : lstPrestamosBD) {
			
			lstPrestamos.add(new PrestamoDTO(prestamo));
			
		}
		
		return lstPrestamos;
	}
	
}
