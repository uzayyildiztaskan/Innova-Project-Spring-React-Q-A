package com.ws.Q.A.question;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ws.Q.A.user.User;
import com.ws.Q.A.user.UserService;

@Service
public class QuestionService {
	
	QuestionRepository questionRepository;
	
	UserService userService;

	public QuestionService(QuestionRepository questionRepository, UserService userService) {
		super();
		this.questionRepository = questionRepository;
		this.userService = userService;
	}

	public void save(Question question, User user) {
		question.setTimestamp(new Date());
		question.setUser(user);
		questionRepository.save(question);		
	}

	public Page<Question> getQuestions(Pageable page) {
		
		return questionRepository.findAll(page);
	}

	public Page<Question> getQuestionsOfUser(String username, Pageable page) {
		User inDB = userService.getByUsername(username);		
		return questionRepository.findByUser(inDB, page);
	}	
}
