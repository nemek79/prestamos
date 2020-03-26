package es.vir2al.fwk.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import es.vir2al.fwk.constantes.AppConstants;
import es.vir2al.fwk.dtos.security.UserDTO;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);
	
    @Autowired
    private JwtTokenProvider tokenProvider;
	
    @Override
    protected void doFilterInternal(HttpServletRequest request, 
    								HttpServletResponse response, 
    								FilterChain filterChain) throws ServletException, IOException {
    	
    	UserDTO user = new UserDTO();
    	String jwt = this.getJwtFromRequest(request);
    	
    	try {
	    	if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
	    		
	    		user.setUserName(tokenProvider.getInfo(jwt,AppConstants.JWT_USERNAME));
	    		user.setAuthorities(tokenProvider.getInfo(jwt,AppConstants.JWT_AUTHS));
	    		user.setAplicacion(tokenProvider.getInfo(jwt,AppConstants.JWT_APLICACION));
	    		
	    		
	    		UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
	    		authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
	    		
	    		SecurityContextHolder.getContext().setAuthentication(authentication);
	    		
	    	}
    	} catch (Exception ex) {
    		logger.error("Could not set user authentication in security context", ex);
    	}
    	
    	filterChain.doFilter(request, response);
    	
    }
    
    private String getJwtFromRequest(HttpServletRequest request) {
        
    	String bearerToken = request.getHeader(AppConstants.HEADER_REQUEST_AUTH);
        
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith(AppConstants.HEADER_REQUEST_BEARER)) {
            return bearerToken.substring(AppConstants.BEARER_LONG, bearerToken.length());
        }
        return null;
    }
	
}
