package es.vir2al.prestamos.services;

import java.util.List;

import es.vir2al.prestamos.dtos.ClienteDTO;

public interface ClientesService {

	public ClienteDTO getById(Long id) throws Exception;
	public List<ClienteDTO> getAll() throws Exception;
	public ClienteDTO save(ClienteDTO cliente) throws Exception;
	public void delete(ClienteDTO cliente) throws Exception;
	public void delete(Long id) throws Exception;
	public void delete(List<Long> lstClientes) throws Exception;
	
}
