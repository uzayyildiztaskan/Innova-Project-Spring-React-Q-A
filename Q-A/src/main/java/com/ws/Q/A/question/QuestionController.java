package com.ws.Q.A.question;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ws.Q.A.shared.GenericResponse;

@RestController
@RequestMapping("/api/1.0")
public class QuestionController {
	
	@Autowired
	QuestionService questionService;
	
	@PostMapping("/questions")
	GenericResponse saveQuestion(@Valid @RequestBody Question question) {
		questionService.save(question);
		return new GenericResponse("Question saved.");
	}
	
	@GetMapping("/questions")
	Page<Question> getQuestions(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return questionService.getQuestions(page);
	}
}
