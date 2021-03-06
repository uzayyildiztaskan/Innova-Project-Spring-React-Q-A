package com.ws.Q.A.user;

import java.io.IOException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ws.Q.A.error.NotFoundException;
import com.ws.Q.A.file.FileService;
import com.ws.Q.A.user.vm.UserUpdateVM;

@Service
public class UserService {
	
	UserRepository	userRepository;
	
	PasswordEncoder passwordEncoder;
	
	FileService fileService;
	
	public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, FileService fileService) {
		super();
		this.userRepository = userRepository;
		this.passwordEncoder = passwordEncoder;
		this.fileService = fileService;
	}
	
	public void save(User user) {
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		userRepository.save(user);		
	}

	public Page<User> getUsers(Pageable page, User user, String searchedDisplayName) {
		
		if(searchedDisplayName == null) {
			if(user != null) {
				return userRepository.findByUsernameNot(user.getUsername(), page);
			}
			return userRepository.findAll(page);			
		}
		
		return userRepository.findByDisplayNameContains(searchedDisplayName, page);
		
	}

	public User getByUsername(String username) {
		User inDB = userRepository.findByUsername(username);
		if(inDB == null) {
			throw new NotFoundException();
		}
		return inDB;
	}

	public User updateUser(String username, UserUpdateVM updatedUser) {
		User inDB = getByUsername(username);
		inDB.setDisplayName(updatedUser.getDisplayName());
		if (updatedUser.getImage() != null) {
			String oldImageName = inDB.getImage();
			try {
				String storedFileName = fileService.writeBase64EncodedStringToFile(updatedUser.getImage());
				inDB.setImage(storedFileName);
			} catch (IOException e) {
				e.printStackTrace();
			}
			fileService.deleteProfileImage(oldImageName);
		}
		return userRepository.save(inDB);		
	}

	public void deleteUser(String username) {
		User inDB = userRepository.findByUsername(username);		
		fileService.deleteProfileImage(inDB.getImage());
		
		userRepository.deleteByUsername(username);
	}
}
