package com.ws.Q.A.question;

import java.util.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
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

	public Page<Question> getOldQuestions(long id, String username, Pageable page) {
		Specification<Question> specification = idLessThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));
		}		
		
		return questionRepository.findAll(specification, page);
	}
	
	public long getNewQuestionsCount(long id, String username) {
		Specification<Question> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));		
		}
		return questionRepository.count(specification);
	}

	public List<Question> getNewQuestions(long id, String username, Sort sort) {
		Specification<Question> specification = idGreaterThan(id);
		if(username != null) {
			User inDB = userService.getByUsername(username);
			specification = specification.and(userIs(inDB));		
		}
		return questionRepository.findAll(specification, sort);
	}
	
	Specification<Question> idLessThan(long id){
		return (root, query, criteriaBuilder) -> {
				return criteriaBuilder.lessThan(root.get("id"), id);			
		};
	}
	
	Specification<Question> userIs(User user){
		return (root, query, criteriaBuilder) -> {
			return criteriaBuilder.equal(root.get("user"), user);			
		};
	}
	
	Specification<Question> idGreaterThan(long id){
		return (root, query, criteriaBuilder) -> {
				return criteriaBuilder.greaterThan(root.get("id"), id);			
		};
	}

	public void delete(long id) {
		questionRepository.deleteById(id);
		
	}
}
