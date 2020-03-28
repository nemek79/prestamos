package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.models.EstadoOperacion;
import es.vir2al.prestamos.dtos.EstadoOperacionDTO;
import es.vir2al.prestamos.repositories.EstadosOperacionesDAO;
import es.vir2al.prestamos.services.EstadosOperacionesService;

@Service
public class EstadosOperacionesServiceImpl implements EstadosOperacionesService {

	@Autowired
	private EstadosOperacionesDAO estadosOperacionesDAO;
	
	@Override
	@Transactional(readOnly=true)
	public EstadoOperacionDTO getById(Long id) throws Exception {
		
		EstadoOperacion estado = this.estadosOperacionesDAO.findById(id).orElseThrow(
				() -> new Exception("No se encuentra la operación con id: "+id)
		);
		
		return new EstadoOperacionDTO(estado);
	}

	@Override
	@Transactional(readOnly=true)
	public List<EstadoOperacionDTO> getAll() throws Exception {
		
		List<EstadoOperacionDTO> lstEstados = new ArrayList<EstadoOperacionDTO>();
		
		Iterable<EstadoOperacion> it = this.estadosOperacionesDAO.findAll();
		
		for (EstadoOperacion estado : it) {
			lstEstados.add(new EstadoOperacionDTO(estado));
		}
		
		return lstEstados;
	}

}
