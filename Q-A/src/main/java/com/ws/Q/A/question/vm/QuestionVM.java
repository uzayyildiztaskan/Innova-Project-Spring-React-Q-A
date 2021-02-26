package com.ws.Q.A.question.vm;

import com.ws.Q.A.question.Question;
import com.ws.Q.A.user.vm.UserVM;

import lombok.Data;

@Data
public class QuestionVM {
	
	private long id;
	
	private String content;
	
	private long timestamp;
	
	private UserVM user;
	
	public QuestionVM(Question question) {
		this.setId(question.getId());
		this.setContent(question.getContent());
		this.setTimestamp(question.getTimestamp().getTime());
		this.setUser(new UserVM(question.getUser()));
	}
}
