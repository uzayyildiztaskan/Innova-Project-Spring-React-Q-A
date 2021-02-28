package com.ws.Q.A.question;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ws.Q.A.question.vm.QuestionVM;
import com.ws.Q.A.shared.CurrentUser;
import com.ws.Q.A.shared.GenericResponse;
import com.ws.Q.A.user.User;

@RestController
@RequestMapping("/api/1.0")
public class QuestionController {
	
	@Autowired
	QuestionService questionService;
	
	@PostMapping("/questions")
	GenericResponse saveQuestion(@Valid @RequestBody Question question, @CurrentUser User user) {
		questionService.save(question, user);
		return new GenericResponse("Question saved.");
	}
	
	@GetMapping("/questions")
	Page<QuestionVM> getQuestions(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){		
		return questionService.getQuestions(page).map(QuestionVM::new);
	}
	
	@GetMapping({"/questions/{id:[0-9]+}", "/users/{username}/questions/{id:[0-9]+}"})
	ResponseEntity<?> getQuestionsRelative(@PageableDefault(sort = "id", direction = Direction.DESC) Pageable page, @PathVariable long id, @PathVariable(required = false) String username, @RequestParam(name = "count", required = false, defaultValue = "false") boolean count, @RequestParam(name = "direction", defaultValue = "before") String direction){
		if(count) {
			long newQuestionCount = questionService.getNewQuestionsCount(id, username);
			Map<String, Long> response = new HashMap<>();
			response.put("count", newQuestionCount);
			return ResponseEntity.ok(response);
		}
		if(direction.equals("after")) {
			List<Question> newQuestions = questionService.getNewQuestions(id, username, page.getSort());
			List<QuestionVM> newQuestionsVM = newQuestions.stream().map(QuestionVM::new).collect(Collectors.toList());
			return ResponseEntity.ok(newQuestionsVM);
		}
 		return ResponseEntity.ok(questionService.getOldQuestions(id, username, page).map(QuestionVM::new)); 
	}
	
	@GetMapping("/users/{username}/questions")
	Page<QuestionVM> getUserQuestions(@PathVariable String username, @PageableDefault(sort = "id", direction = Direction.DESC) Pageable page){
		return questionService.getQuestionsOfUser(username, page).map(QuestionVM::new);
	}
	
	@DeleteMapping("/questions/{id:[0-9]+}")
	@PreAuthorize("@questionSecurity.isAllowedToDelete(#id, principal)")
	GenericResponse deleteHoax(@PathVariable long id) {
		questionService.delete(id);
		return new GenericResponse("Question removed");
	}
}
