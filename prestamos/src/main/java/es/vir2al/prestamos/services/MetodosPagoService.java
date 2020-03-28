package es.vir2al.prestamos.services;

import java.util.List;

import es.vir2al.prestamos.dtos.MetodoPagoDTO;

public interface MetodosPagoService {

	public MetodoPagoDTO getById(Long id) throws Exception;
	public List<MetodoPagoDTO> getAll() throws Exception;
	
}
