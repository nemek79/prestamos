package es.vir2al.prestamos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import es.vir2al.prestamos.models.Operacion;

public interface OperacionesDAO extends JpaRepository<Operacion, Long> {

}
