package com.ws.Q.A;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.ws.Q.A.user.User;
import com.ws.Q.A.user.UserService;

@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	@Bean
	CommandLineRunner createInitialUsers(UserService userService) {
		return (args) -> {
				User user = new User();
				user.setUsername("user");
				user.setDisplayName("display1");
				user.setPassword("P4ssword");
				userService.save(user);
		};
	}
}
