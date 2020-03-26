package es.vir2al.fwk.dtos.security;

import java.io.Serializable;

public class RoleDTO implements Serializable {

	private static final long serialVersionUID = 1289966975725567723L;
	
	private String role;

	public RoleDTO() {
		
	}
	
	public RoleDTO(String role) {

		this.role = role;
		
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}
	
	

}
