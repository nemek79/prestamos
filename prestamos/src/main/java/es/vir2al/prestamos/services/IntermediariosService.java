package es.vir2al.prestamos.services;

import java.util.List;

import es.vir2al.prestamos.dtos.IntermediarioDTO;

public interface IntermediariosService {

	public IntermediarioDTO getById(Long id) throws Exception;
	public List<IntermediarioDTO> getAll() throws Exception;
	public IntermediarioDTO save(IntermediarioDTO intermediario) throws Exception;
	public void delete(IntermediarioDTO intermediario) throws Exception;
	public void delete(Long id) throws Exception;
	public void delete(List<Long> lstIntermediarios) throws Exception;
	
}
