package es.vir2al.prestamos.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import es.vir2al.prestamos.models.ComentarioPrestamo;
import es.vir2al.prestamos.models.Prestamo;

public interface ComentariosPrestamoDAO extends CrudRepository<ComentarioPrestamo, Long> {

	List<ComentarioPrestamo> findByPrestamo(Prestamo prestamo);
	
}
