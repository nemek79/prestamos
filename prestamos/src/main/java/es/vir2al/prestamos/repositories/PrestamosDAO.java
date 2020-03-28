package es.vir2al.prestamos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import es.vir2al.prestamos.models.Prestamo;

public interface PrestamosDAO extends JpaRepository<Prestamo, Long> {

}
