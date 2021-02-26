package com.ws.Q.A.question;

import java.util.Date;

import org.springframework.stereotype.Service;

@Service
public class QuestionService {
	
	QuestionRepository questionRepository;

	public QuestionService(QuestionRepository questionRepository) {
		super();
		this.questionRepository = questionRepository;
	}

	public void save(Question question) {
		question.setTimestamp(new Date());
		questionRepository.save(question);		
	}	
}
