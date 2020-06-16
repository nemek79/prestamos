package es.vir2al.prestamos.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import es.vir2al.prestamos.dtos.MensualidadByMonthsDTO;
import es.vir2al.prestamos.models.Mensualidad;
import es.vir2al.prestamos.models.Prestamo;

public interface MensualidadesDAO extends JpaRepository<Mensualidad, Long> {

	public Optional<Mensualidad> findByPrestamoAndMesAndYear(Prestamo prestamo, Integer mes, Integer year);

	public Optional<List<Mensualidad>> findByMesAndYear(Integer mes, Integer year);

	@Query("SELECT new es.vir2al.prestamos.dtos.MensualidadByMonthsDTO(m.mes,sum(m.intereses)) FROM Mensualidad m WHERE m.year=?1 GROUP BY m.mes ORDER BY m.mes")
	public List<MensualidadByMonthsDTO> getInteresByMesFromYear(Integer year);
	
}
