package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.models.ComentarioOperacion;
import es.vir2al.prestamos.dtos.ComentarioOperacionDTO;
import es.vir2al.prestamos.dtos.OperacionDTO;
import es.vir2al.prestamos.repositories.ComentariosOperacionDAO;
import es.vir2al.prestamos.services.ComentariosOperacionService;

public class ComentariosOperacionServiceImpl implements ComentariosOperacionService {

	@Autowired
	private ComentariosOperacionDAO comentariosOperacionDAO;
	
	@Override
	@Transactional(readOnly=true)
	public ComentarioOperacionDTO getById(Long id) throws Exception {
		
		ComentarioOperacion comentarioBD = this.comentariosOperacionDAO.findById(id).orElseThrow(
				() -> new Exception("No se encuentra el comentario de la operación con id: "+id)
		);		
		
		return new ComentarioOperacionDTO(comentarioBD);
	}

	@Override
	@Transactional(readOnly=true)
	public List<ComentarioOperacionDTO> getByOperacion(OperacionDTO operacion) throws Exception {
		
		// TODO crear nuevo metodo en el dao para obtener los comentarios asociados a la operacion 
		
		List<ComentarioOperacionDTO> lstComentarios = new ArrayList<ComentarioOperacionDTO>();
		
		Iterable<ComentarioOperacion> it = this.comentariosOperacionDAO.findAll();
		
		for (ComentarioOperacion comentario : it) {
			
			lstComentarios.add(new ComentarioOperacionDTO(comentario));
			
		}
		
		return lstComentarios;
	}

	@Override
	@Transactional(readOnly=false)
	public ComentarioOperacionDTO save(ComentarioOperacionDTO comentario) throws Exception {
		
		ComentarioOperacion comentarioBD = this.comentariosOperacionDAO.save(comentario.asComentarioOperacion());
		
		return new ComentarioOperacionDTO(comentarioBD);
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(ComentarioOperacionDTO comentario) throws Exception {

		this.comentariosOperacionDAO.delete(comentario.asComentarioOperacion());
		
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(Long id) throws Exception {

		this.comentariosOperacionDAO.deleteById(id);
		
	}

}
