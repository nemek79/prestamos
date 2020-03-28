package es.vir2al.prestamos.repositories;

import org.springframework.data.repository.CrudRepository;

import es.vir2al.prestamos.models.EstadoPrestamo;

public interface EstadosPrestamoDAO extends CrudRepository<EstadoPrestamo, Long> {

}
