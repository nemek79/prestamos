package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.models.MetodoPago;
import es.vir2al.prestamos.dtos.MetodoPagoDTO;
import es.vir2al.prestamos.repositories.MetodosPagoDAO;
import es.vir2al.prestamos.services.MetodosPagoService;

@Service
public class MetodosPagoServiceImpl implements MetodosPagoService {

	@Autowired
	private MetodosPagoDAO metodosPagoDAO;
	
	@Override
	@Transactional(readOnly=true)
	public MetodoPagoDTO getById(Long id) throws Exception {
		
		MetodoPago metodo = this.metodosPagoDAO.findById(id).orElseThrow(
		 () -> new Exception("No se encuentra el método de pago con id: "+id)
		);
		
		return new MetodoPagoDTO(metodo);
	}

	@Override
	@Transactional(readOnly=true)
	public List<MetodoPagoDTO> getAll() throws Exception {
		
		List<MetodoPagoDTO> lstMetodos = new ArrayList<MetodoPagoDTO>();
		Iterable<MetodoPago> it = this.metodosPagoDAO.findAll();
		
		for (MetodoPago metodo : it) {
			lstMetodos.add(new MetodoPagoDTO(metodo));
		}
		
		return lstMetodos;
	}

}
