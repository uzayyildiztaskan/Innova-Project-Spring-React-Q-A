package com.ws.Q.A.answer;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Size;

import com.ws.Q.A.question.Question;
import com.ws.Q.A.user.User;

import lombok.Data;

@Data
@Entity
public class Answer {
	
	@Id @GeneratedValue
	private long id;
	
	@Size(min = 1, max = 1000)
	@Column(length = 1000)
	private String content;
	
	@Temporal(TemporalType.TIMESTAMP)
	private Date timestamp;
	
	@ManyToOne
	private User user;
	
	@ManyToOne
	private Question question;

}
