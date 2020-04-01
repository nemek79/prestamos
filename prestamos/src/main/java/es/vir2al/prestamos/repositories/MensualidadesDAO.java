package es.vir2al.prestamos.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import es.vir2al.prestamos.models.Mensualidad;
import es.vir2al.prestamos.models.Prestamo;

public interface MensualidadesDAO extends JpaRepository<Mensualidad, Long> {

	public Optional<Mensualidad> findByPrestamoAndMesAndYear(Prestamo prestamo, Integer mes, Integer year);
	
}
