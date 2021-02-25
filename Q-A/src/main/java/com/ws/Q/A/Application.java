package com.ws.Q.A;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import com.ws.Q.A.user.User;
import com.ws.Q.A.user.UserService;

@SpringBootApplication
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	@Bean
	@Profile("dev")
	CommandLineRunner createInitialUsers(UserService userService) {
		return (args) -> {
			for(int i = 1; i<=25; i++) {
			User user = new User();
			user.setUsername("user" + i);
			user.setDisplayName("display" + i);
			user.setPassword("P4ssword");
			userService.save(user);
			}
		};
	}
}
