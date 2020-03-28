package es.vir2al.prestamos.repositories;

import org.springframework.data.repository.CrudRepository;

import es.vir2al.prestamos.models.ComentarioOperacion;

public interface ComentariosOperacionDAO extends CrudRepository<ComentarioOperacion, Long> {

}
