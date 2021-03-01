package com.ws.Q.A.answer.vm;

import com.ws.Q.A.answer.Answer;
import com.ws.Q.A.user.vm.UserVM;

import lombok.Data;

@Data
public class AnswerVM {
	
	private long id;
	
	private String content;
	
	private long timestamp;
	
	private UserVM user;
	
	public AnswerVM(Answer answer) {
		this.setId(answer.getId());
		this.setContent(answer.getContent());
		this.setTimestamp(answer.getTimestamp().getTime());
		this.setUser(new UserVM(answer.getUser()));
	}
}
