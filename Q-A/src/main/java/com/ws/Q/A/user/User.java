package com.ws.Q.A.user;

import java.util.Collection;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.OneToMany;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;

import com.ws.Q.A.answer.Answer;
import com.ws.Q.A.auth.Token;
import com.ws.Q.A.question.Question;

import lombok.Data;

@Data
@Entity
public class User implements UserDetails{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 3162130654393920343L;

	@Id
	@GeneratedValue
	private long id;
	
	@NotNull(message = "{askify.constraint.username.notNull.message}")
	@Size(min = 4, max = 255)
	@UniqueUsername
	private String username;
	
	@NotNull
	@Size(min = 4, max = 255)
	private String displayName;
	
	@NotNull
	@Size(min = 8, max = 255)
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{askify.constraint.password.Pattern.message}")
	private String password;
	
	@Lob
	private String image;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	private List<Question> questions;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	private List<Answer> answers;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.REMOVE)
	private List<Token> tokens;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return AuthorityUtils.createAuthorityList("Role_user");

	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
