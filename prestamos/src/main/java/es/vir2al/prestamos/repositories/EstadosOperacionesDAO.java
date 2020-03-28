package es.vir2al.prestamos.repositories;

import org.springframework.data.repository.CrudRepository;

import es.vir2al.prestamos.models.EstadoOperacion;

public interface EstadosOperacionesDAO extends CrudRepository<EstadoOperacion, Long> {

}
