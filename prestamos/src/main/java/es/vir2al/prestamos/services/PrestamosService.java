package es.vir2al.prestamos.services;

import java.util.List;

import es.vir2al.prestamos.dtos.PrestamoDTO;

public interface PrestamosService {

	public PrestamoDTO getById(Long id) throws Exception;
	public List<PrestamoDTO> getAll() throws Exception;
	public PrestamoDTO save(PrestamoDTO prestamo) throws Exception;
	public void delete(PrestamoDTO prestamo) throws Exception;
	public void delete(Long id) throws Exception;
	
}
