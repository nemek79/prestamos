package es.vir2al.prestamos.services;

import java.util.List;

import es.vir2al.prestamos.dtos.EstadoPrestamoDTO;

public interface EstadosPrestamoService {

	public EstadoPrestamoDTO getById(Long id) throws Exception;
	public List<EstadoPrestamoDTO> getAll() throws Exception;
	
}
