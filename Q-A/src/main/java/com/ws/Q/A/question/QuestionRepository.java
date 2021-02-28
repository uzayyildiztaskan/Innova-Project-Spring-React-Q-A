package com.ws.Q.A.question;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.ws.Q.A.user.User;

public interface QuestionRepository extends JpaRepository<Question, Long>, JpaSpecificationExecutor<Question>{
	
	Page<Question> findByUser(User user, Pageable page);
}
