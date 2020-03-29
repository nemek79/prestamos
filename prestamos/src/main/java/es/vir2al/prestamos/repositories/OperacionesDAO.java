package es.vir2al.prestamos.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import es.vir2al.prestamos.models.Operacion;
import es.vir2al.prestamos.models.Prestamo;

public interface OperacionesDAO extends JpaRepository<Operacion, Long> {

	public List<Operacion> findByPrestamo(Prestamo prestamo);
	
}
