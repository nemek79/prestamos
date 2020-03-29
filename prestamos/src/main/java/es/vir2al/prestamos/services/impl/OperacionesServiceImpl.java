package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.prestamos.dtos.OperacionDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;
import es.vir2al.prestamos.models.Operacion;
import es.vir2al.prestamos.repositories.OperacionesDAO;
import es.vir2al.prestamos.services.OperacionesService;

@Service
public class OperacionesServiceImpl implements OperacionesService {

	@Autowired
	private OperacionesDAO operacionesDAO;
	
	@Override
	@Transactional(readOnly=true)
	public OperacionDTO getById(Long id) throws Exception {
		
		Operacion operacionBD = this.operacionesDAO.findById(id).orElseThrow(
				() -> new Exception("No se encuentra la operación con id: "+id)
		);
		
		return new OperacionDTO(operacionBD);
	}

	@Override
	@Transactional(readOnly=true)
	public List<OperacionDTO> getByPrestamo(PrestamoDTO prestamo) throws Exception {

		List<OperacionDTO> lstOperaciones = new ArrayList<OperacionDTO>();
		
		Iterable<Operacion> it = this.operacionesDAO.findByPrestamo(prestamo.asPrestamo());
		
		for (Operacion operacion : it) {
			
			lstOperaciones.add(new OperacionDTO(operacion));
			
		}
		
		return lstOperaciones;
	}

	@Override
	@Transactional(readOnly=false)
	public OperacionDTO save(OperacionDTO operacion) throws Exception {
	
		Operacion operacionBD = this.operacionesDAO.save(operacion.asOperacion());
		
		return new OperacionDTO(operacionBD);
		
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(OperacionDTO operacion) throws Exception {
		
		this.operacionesDAO.delete(operacion.asOperacion());
		
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(Long id) throws Exception {

		this.operacionesDAO.deleteById(id);
		
	}

}
