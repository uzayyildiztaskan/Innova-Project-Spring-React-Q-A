package com.ws.Q.A.answer;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ws.Q.A.user.User;

@Service(value = "answerSecurity")
public class AnswerSecurityService {
	
	@Autowired
	AnswerRepository answerRepository;
	
	public boolean isAllowedToDelete(long id, User loggedInUser) {
		Optional<Answer> optionalAnswer = answerRepository.findById(id);
		if(!optionalAnswer.isPresent()) {
			return false;
		}
		
		Answer answer = optionalAnswer.get();		
		if(answer.getUser().getId() != loggedInUser.getId()) {
			return false;
		}
		
		return true;
	}
}
