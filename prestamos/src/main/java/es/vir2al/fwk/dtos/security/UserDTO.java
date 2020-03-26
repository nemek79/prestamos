package es.vir2al.fwk.dtos.security;

import java.io.Serializable;
import java.util.Arrays;
import java.util.Collection;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDTO implements Serializable, UserDetails {

	private static final long serialVersionUID = -2413405303552766003L;

	private String userName;
	
	private Collection<? extends GrantedAuthority> authorities;
	
	private String aplicacion;
	
	public UserDTO() {

	}
	
	public UserDTO(String userName, Collection<? extends GrantedAuthority> authorities, String aplicacion) {

		this.userName = userName;
		this.authorities = authorities;
		this.aplicacion = aplicacion;
	
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {

		return this.authorities;
	}
	
	public void setAuthorities(String auths) {
		
		auths = auths.replace("[", "");
		auths = auths.replace("]", "");

		this.authorities = Arrays.stream(auths.split(",")).map(SimpleGrantedAuthority::new).collect(Collectors.toList());	
	}

	@Override
	public String getPassword() {
		
		return null;
	}

	@Override
	public String getUsername() {
		
		return this.userName;
	}

	@Override
	public boolean isAccountNonExpired() {
		
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}

	@Override
	public boolean isEnabled() {
		
		return true;
	}

	public String getAplicacion() {
		return aplicacion;
	}

	public void setAplicacion(String aplicacion) {
		this.aplicacion = aplicacion;
	}

}
