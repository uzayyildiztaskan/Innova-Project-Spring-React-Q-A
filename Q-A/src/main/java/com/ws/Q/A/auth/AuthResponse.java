package com.ws.Q.A.auth;

import com.ws.Q.A.user.vm.UserVM;

import lombok.Data;

@Data
public class AuthResponse {
	
	private String token;
	
	private UserVM user;
	
}
