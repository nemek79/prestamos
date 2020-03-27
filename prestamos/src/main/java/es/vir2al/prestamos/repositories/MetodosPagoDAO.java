package es.vir2al.prestamos.repositories;

import org.springframework.data.repository.CrudRepository;

import es.vir2al.models.MetodoPago;

public interface MetodosPagoDAO extends CrudRepository<MetodoPago, Long> {

}
