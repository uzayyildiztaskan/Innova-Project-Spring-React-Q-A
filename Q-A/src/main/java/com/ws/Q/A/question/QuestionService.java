package com.ws.Q.A.question;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

	public Page<Question> getQuestions(Pageable page) {
		
		return questionRepository.findAll(page);
	}	
}
