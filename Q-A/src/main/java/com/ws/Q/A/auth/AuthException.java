package com.ws.Q.A.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class AuthException extends RuntimeException{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3932447741847787085L;

	public AuthException() {
		
		super("Authorization failed");
	}
	
	public AuthException(String message) {
		
		super(message);
	}

}
