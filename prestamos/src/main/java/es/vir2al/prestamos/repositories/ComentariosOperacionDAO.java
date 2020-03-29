package es.vir2al.prestamos.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;

import es.vir2al.prestamos.models.ComentarioOperacion;
import es.vir2al.prestamos.models.Operacion;

public interface ComentariosOperacionDAO extends CrudRepository<ComentarioOperacion, Long> {

	List<ComentarioOperacion> findByOperacion(Operacion operacion);
	
}
