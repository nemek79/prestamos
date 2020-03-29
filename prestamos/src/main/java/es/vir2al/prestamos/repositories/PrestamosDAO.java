package es.vir2al.prestamos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import es.vir2al.prestamos.models.EstadoPrestamo;
import es.vir2al.prestamos.models.Prestamo;

public interface PrestamosDAO extends JpaRepository<Prestamo, Long> {

	List<Prestamo> findByEstadoIn(List<EstadoPrestamo> estado);
	
}
