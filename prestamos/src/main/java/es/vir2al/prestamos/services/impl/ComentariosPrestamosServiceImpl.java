package es.vir2al.prestamos.services.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import es.vir2al.models.ComentarioPrestamo;
import es.vir2al.prestamos.dtos.ComentarioPrestamoDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;
import es.vir2al.prestamos.repositories.ComentariosPrestamoDAO;
import es.vir2al.prestamos.services.ComentariosPrestamoService;

@Service
public class ComentariosPrestamosServiceImpl implements ComentariosPrestamoService {

	@Autowired
	private ComentariosPrestamoDAO comentariosPrestamoDAO;
	
	@Override
	@Transactional(readOnly=true)
	public ComentarioPrestamoDTO getById(Long id) throws Exception {
		
		ComentarioPrestamo comentarioBD = this.comentariosPrestamoDAO.findById(id).orElseThrow(
				() -> new Exception("No se encuentra el comentario del préstamo con id: "+id)
		);
		
		return new ComentarioPrestamoDTO(comentarioBD);
	}

	@Override
	@Transactional(readOnly=true)
	public List<ComentarioPrestamoDTO> getByPrestamo(PrestamoDTO prestamo) throws Exception {
		
		// TODO crear el método del dao para buscar por prestamo
		
		List<ComentarioPrestamoDTO> lstComentarios = new ArrayList<ComentarioPrestamoDTO>();
		Iterable<ComentarioPrestamo> it = this.comentariosPrestamoDAO.findAll(); // TODO aquí hay que buscar sólo los del prestamo
		
		for (ComentarioPrestamo comentario : it) {
			
			lstComentarios.add(new ComentarioPrestamoDTO(comentario));
			
		}
		
		return lstComentarios;
	}

	@Override
	@Transactional(readOnly=false)
	public ComentarioPrestamoDTO save(ComentarioPrestamoDTO prestamo) throws Exception {
		
		ComentarioPrestamo comentarioBD = this.comentariosPrestamoDAO.save(prestamo.asComentarioPrestamo());
		
		return new ComentarioPrestamoDTO(comentarioBD);
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(ComentarioPrestamoDTO comentario) throws Exception {
		
		this.comentariosPrestamoDAO.delete(comentario.asComentarioPrestamo());
		
	}

	@Override
	@Transactional(readOnly=false)
	public void delete(Long id) throws Exception {
		
		this.comentariosPrestamoDAO.deleteById(id);
		
	}

}
