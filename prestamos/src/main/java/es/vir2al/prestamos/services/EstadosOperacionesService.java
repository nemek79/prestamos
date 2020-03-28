package es.vir2al.prestamos.services;

import java.util.List;

import es.vir2al.prestamos.dtos.EstadoOperacionDTO;

public interface EstadosOperacionesService {

	public EstadoOperacionDTO getById(Long id) throws Exception;
	public List<EstadoOperacionDTO> getAll() throws Exception;
	
}
