package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.prestamos.dtos.EstadoPrestamoDTO;
import es.vir2al.prestamos.models.EstadoPrestamo;
import es.vir2al.prestamos.repositories.EstadosPrestamoDAO;
import es.vir2al.prestamos.services.EstadosPrestamoService;

@Service
public class EstadosPrestamoServiceImpl implements EstadosPrestamoService {

	@Autowired
	private EstadosPrestamoDAO estadosPrestamoDAO;
	
	@Override
	@Transactional(readOnly=true)
	public EstadoPrestamoDTO getById(Long id) throws Exception {
		
		EstadoPrestamo estado = this.estadosPrestamoDAO.findById(id).orElseThrow(
				() -> new Exception("No se encuentra la operación con id: "+id)
		);
		
		return new EstadoPrestamoDTO(estado);
	}

	@Override
	@Transactional(readOnly=true)
	public List<EstadoPrestamoDTO> getAll() throws Exception {
		
		List<EstadoPrestamoDTO> lstEstados = new ArrayList<EstadoPrestamoDTO>();
		
		Iterable<EstadoPrestamo> it = this.estadosPrestamoDAO.findAll();
		
		for (EstadoPrestamo estado : it) {
			lstEstados.add(new EstadoPrestamoDTO(estado));
		}
		
		return lstEstados;
	}

}
