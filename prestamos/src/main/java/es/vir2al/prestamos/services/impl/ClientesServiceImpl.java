package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.prestamos.dtos.ClienteDTO;
import es.vir2al.prestamos.models.Cliente;
import es.vir2al.prestamos.repositories.ClientesDAO;
import es.vir2al.prestamos.services.ClientesService;

@Service
public class ClientesServiceImpl implements ClientesService {

	@Autowired
	private ClientesDAO clientesDAO;
	
	@Override
	@Transactional(readOnly=true)
	public ClienteDTO getById(Long id) throws Exception {
		
		Cliente cliente = this.clientesDAO.findById(id).orElseThrow(
				() -> new Exception("No se encuentra cliente con id: "+id)
		); 
		
		return new ClienteDTO(cliente);
	}

	@Override
	@Transactional(readOnly=true)
	public List<ClienteDTO> getAll() throws Exception {
		
		List<ClienteDTO> lstClientes = new ArrayList<ClienteDTO>();
		
		Iterable<Cliente> it = this.clientesDAO.findAll();
		
		for (Cliente cliente : it) {
			lstClientes.add(new ClienteDTO(cliente));
		}
		
		return lstClientes;
	}

	@Override
	@Transactional(readOnly=false)
	public ClienteDTO save(ClienteDTO cliente) throws Exception {
		
		Cliente clienteBD = this.clientesDAO.save(cliente.asCliente());
		
		return new ClienteDTO(clienteBD);
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(ClienteDTO cliente) throws Exception {
		
		this.clientesDAO.delete(cliente.asCliente());

	}

	@Override
	@Transactional(readOnly=false)
	public void delete(Long id) throws Exception {
		
		this.clientesDAO.deleteById(id);

	}

	@Override
	public void delete(List<Long> lstClientes) throws Exception {
		
		for (Long idCliente : lstClientes) {
			
			this.clientesDAO.deleteById(idCliente);

		}

	}

}
