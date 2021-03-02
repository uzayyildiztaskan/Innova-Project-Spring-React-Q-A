package com.ws.Q.A.auth;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

import com.ws.Q.A.user.User;

import lombok.Data;

@Entity
@Data
public class Token {
	
	@Id
	private String token;
	
	@ManyToOne
	private User user;
}
