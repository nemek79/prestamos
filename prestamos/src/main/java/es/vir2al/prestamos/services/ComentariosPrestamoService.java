package es.vir2al.prestamos.services;

import java.util.List;

import es.vir2al.prestamos.dtos.ComentarioPrestamoDTO;
import es.vir2al.prestamos.dtos.PrestamoDTO;

public interface ComentariosPrestamoService {

	public ComentarioPrestamoDTO getById(Long id) throws Exception;
	public List<ComentarioPrestamoDTO> getByPrestamo(PrestamoDTO prestamo) throws Exception;
	public ComentarioPrestamoDTO save(ComentarioPrestamoDTO prestamo) throws Exception;
	public void delete(ComentarioPrestamoDTO comentario) throws Exception;
	public void delete(Long id) throws Exception;
	
}
