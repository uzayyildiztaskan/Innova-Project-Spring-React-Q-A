package com.ws.Q.A.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ws.Q.A.shared.CurrentUser;
import com.ws.Q.A.user.User;
import com.ws.Q.A.user.UserRepository;
import com.ws.Q.A.user.vm.UserVM;

@RestController
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
	
	@PostMapping("/api/1.0/auth")
	UserVM handleAuthentication(@CurrentUser User user) {
		return new UserVM(user);
	}
}
