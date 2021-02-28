package com.ws.Q.A.question;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ws.Q.A.user.User;

@Service(value = "questionSecurity")
public class QuestionSecurityService {
	
	@Autowired
	QuestionRepository questionRepository;
	
	public boolean isAllowedToDelete(long id, User loggedInUser) {
		Optional<Question> optionalQuestion = questionRepository.findById(id);
		if(!optionalQuestion.isPresent()) {
			return false;
		}
		
		Question question = optionalQuestion.get();		
		if(question.getUser().getId() != loggedInUser.getId()) {
			return false;
		}
		
		return true;
	}
}
