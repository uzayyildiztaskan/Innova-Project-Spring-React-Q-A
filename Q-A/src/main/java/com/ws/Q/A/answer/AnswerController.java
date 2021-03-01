package com.ws.Q.A.answer;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ws.Q.A.answer.vm.AnswerVM;
import com.ws.Q.A.question.Question;
import com.ws.Q.A.question.QuestionService;
import com.ws.Q.A.shared.CurrentUser;
import com.ws.Q.A.shared.GenericResponse;
import com.ws.Q.A.user.User;

@RestController
@RequestMapping("/api/1.0/questions")
public class AnswerController {
	
	@Autowired
	AnswerService answerService;
	
	@Autowired
	QuestionService questionService;
	
	@PostMapping("/{id:[0-9]+}/answers")
	GenericResponse saveAnswer(@PathVariable long id, @Valid @RequestBody Answer answer, @CurrentUser User user) {
		Question question = questionService.getById(id);
		answerService.save(answer, user, question);
		return new GenericResponse("Answer saved.");
	}
	@GetMapping("/{id:[0-9]+}/answers")
	Page<AnswerVM> getQuestionAnswers(@PathVariable long id, @PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return answerService.getAnswersOfQuestion(id, page).map(AnswerVM::new);
	}
	
	@DeleteMapping("/{questionId:[0-9]+}/answers/{answerId:[0-9]+}")
	@PreAuthorize("@answerSecurity.isAllowedToDelete(#answerId, principal)")
	GenericResponse deleteAnswer(@PathVariable long answerId) {
		answerService.delete(answerId);
		return new GenericResponse("Answer removed");
	}
}
