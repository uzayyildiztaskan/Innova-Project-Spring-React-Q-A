package com.ws.Q.A.auth;

import java.util.Base64;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.ws.Q.A.shared.Views;
import com.ws.Q.A.user.User;
import com.ws.Q.A.user.UserRepository;

@RestController
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/api/1.0/auth")
	@JsonView(Views.Base.class)
	ResponseEntity<?> handleAuthentication(@RequestHeader(name="Authorization") String authorization) {
		String base64encoded = authorization.split("Basic ")[1];
		String decoded = new String(Base64.getDecoder().decode(base64encoded));
		String[] parts = decoded.split(":");
		String username = parts[0];
		
		User inDB = userRepository.findByUsername(username);
		
		return ResponseEntity.ok(inDB);
	}
}
