package com.ws.Q.A.user;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.ws.Q.A.shared.GenericResponse;
import com.ws.Q.A.shared.Views;

@RestController
public class UserController {
	
	@Autowired
	UserService userService;
	
	@PostMapping("/api/1.0/users")
	public GenericResponse registerUser(@Valid @RequestBody User user) {		
		userService.save(user);
		return new GenericResponse("User created");
	}
	
	@GetMapping("/api/1.0/users")
	@JsonView(Views.Base.class)
	List<User> getUsers(){
		return userService.getUsers();
	}	
}
