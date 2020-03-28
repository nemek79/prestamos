package es.vir2al.prestamos.services;

import java.util.List;

import es.vir2al.prestamos.dtos.OperacionDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;

public interface OperacionesService {

	public OperacionDTO getById(Long id) throws Exception;
	public List<OperacionDTO> getByPrestamo(PrestamoDTO prestamo) throws Exception;
	public OperacionDTO save(OperacionDTO operacion) throws Exception;
	public void delete(OperacionDTO operacion) throws Exception;
	public void delete(Long id) throws Exception;
	
}
