package com.ws.Q.A.question;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ws.Q.A.shared.GenericResponse;

@RestController
public class QuestionController {
	
	@Autowired
	QuestionService questionService;
	
	@PostMapping("/api/1.0/questions")
	GenericResponse saveQuestion(@Valid @RequestBody Question question) {
		questionService.save(question);
		return new GenericResponse("Question saved.");
	}
}
