package com.ws.Q.A.question;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ws.Q.A.user.User;

@Service(value = "questionSecurity")
public class QuestionSecurityService {
	
	@Autowired
	QuestionRepository questionRepository;
	
	public boolean isAllowedToDelete(long id, User loggedInUser) {
		Question question = questionRepository.findById(id);
		if(question == null) {
			return false;
		}
		
		if(question.getUser().getId() != loggedInUser.getId()) {
			return false;
		}
		
		return true;
	}
}
