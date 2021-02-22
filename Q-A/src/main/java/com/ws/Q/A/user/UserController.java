package com.ws.Q.A.user;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ws.Q.A.shared.CurrentUser;
import com.ws.Q.A.shared.GenericResponse;
import com.ws.Q.A.user.vm.UserVM;

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
	Page<UserVM> getUsers(Pageable page, @CurrentUser User user){
		return userService.getUsers(page, user).map(UserVM::new);
	}	
}
