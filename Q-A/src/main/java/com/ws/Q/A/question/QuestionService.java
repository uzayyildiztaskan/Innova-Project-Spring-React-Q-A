package com.ws.Q.A.question;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.ws.Q.A.user.User;

@Service
public class QuestionService {
	
	QuestionRepository questionRepository;

	public QuestionService(QuestionRepository questionRepository) {
		super();
		this.questionRepository = questionRepository;
	}

	public void save(Question question, User user) {
		question.setTimestamp(new Date());
		question.setUser(user);
		questionRepository.save(question);		
	}

	public Page<Question> getQuestions(Pageable page) {
		
		return questionRepository.findAll(page);
	}	
}
