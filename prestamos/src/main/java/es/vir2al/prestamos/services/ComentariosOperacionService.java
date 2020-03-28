package es.vir2al.prestamos.services;

import java.util.List;

import es.vir2al.prestamos.dtos.ComentarioOperacionDTO;
import es.vir2al.prestamos.dtos.OperacionDTO;

public interface ComentariosOperacionService {

	public ComentarioOperacionDTO getById(Long id) throws Exception;
	public List<ComentarioOperacionDTO> getByOperacion(OperacionDTO operacion) throws Exception;
	public ComentarioOperacionDTO save(ComentarioOperacionDTO comentario) throws Exception;
	public void delete(ComentarioOperacionDTO comentario) throws Exception;
	public void delete(Long id) throws Exception;
	
}
