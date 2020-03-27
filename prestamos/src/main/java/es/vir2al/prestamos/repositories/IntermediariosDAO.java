package es.vir2al.prestamos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import es.vir2al.models.Intermediario;

public interface IntermediariosDAO extends JpaRepository<Intermediario, Long> {

}
