package es.vir2al.prestamos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import es.vir2al.models.Cliente;

public interface ClientesDAO extends JpaRepository<Cliente, Long> {

}
