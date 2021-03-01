package com.ws.Q.A.answer;

import java.util.Date;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import com.ws.Q.A.question.Question;
import com.ws.Q.A.question.QuestionService;
import com.ws.Q.A.user.User;
import com.ws.Q.A.user.UserService;

@Service
public class AnswerService {
	
	AnswerRepository answerRepository;
	
	UserService userService;
	
	QuestionService questionService;

	public AnswerService(AnswerRepository answerRepository, UserService userService, QuestionService questionService) {
		super();
		this.answerRepository = answerRepository;
		this.userService = userService;
		this.questionService = questionService;
	}

	public void save(Answer answer, User user, Question question) {
		answer.setTimestamp(new Date());
		answer.setUser(user);
		answer.setQuestion(question);
		answerRepository.save(answer);		
	}

	public Page<Answer> getAnswersOfQuestion(long id, Pageable page) {
		Question inDB = questionService.getById(id) ;		
		return answerRepository.findByQuestion(inDB, page);
	}
	
	Specification<Answer> userIs(User user){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);			
		};
	}

	public void delete(long id) {		
		answerRepository.deleteById(id);		
	}
}
