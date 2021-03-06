package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.prestamos.dtos.IntermediarioDTO;
import es.vir2al.prestamos.models.Intermediario;
import es.vir2al.prestamos.repositories.IntermediariosDAO;
import es.vir2al.prestamos.services.IntermediariosService;

@Service
public class IntermediariosServiceImpl implements IntermediariosService {

	@Autowired
	private IntermediariosDAO intermediariosDAO;
	
	@Override
	@Transactional(readOnly=true)
	public IntermediarioDTO getById(Long id) throws Exception {
		
		Intermediario intermediario = this.intermediariosDAO.findById(id).orElseThrow(
				() -> new Exception("No se encuentra el intermediario con id: "+id)
		);
		
		return new IntermediarioDTO(intermediario);
	}

	@Override
	@Transactional(readOnly=true)
	public List<IntermediarioDTO> getAll() throws Exception {
		
		List<IntermediarioDTO> lstIntermediario = new ArrayList<IntermediarioDTO>();
		Iterable<Intermediario> it = this.intermediariosDAO.findAll();
		
		for (Intermediario intermediario : it) {
			lstIntermediario.add(new IntermediarioDTO(intermediario));
		}
		
		return lstIntermediario;
	}

	@Override
	@Transactional(readOnly=false)
	public IntermediarioDTO save(IntermediarioDTO intermediario) throws Exception {
		
		Intermediario intermediarioBD = this.intermediariosDAO.save(intermediario.asIntermediario());
		
		return new IntermediarioDTO(intermediarioBD);
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(IntermediarioDTO intermediario) throws Exception {
		
		this.intermediariosDAO.delete(intermediario.asIntermediario());

	}

	@Override
	@Transactional(readOnly=false)
	public void delete(Long id) throws Exception {
		
		this.intermediariosDAO.deleteById(id);

	}

	@Override
	public void delete(List<Long> lstIntermediarios) throws Exception {

		for (Long idIntermediario : lstIntermediarios) {
			
			this.intermediariosDAO.deleteById(idIntermediario);

		}

	}

}
