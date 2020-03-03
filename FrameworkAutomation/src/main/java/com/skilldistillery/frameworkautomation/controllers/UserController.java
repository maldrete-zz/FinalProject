package com.skilldistillery.frameworkautomation.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.frameworkautomation.entities.User;
import com.skilldistillery.frameworkautomation.services.TemplateService;
import com.skilldistillery.frameworkautomation.services.UserService;

@RestController
@RequestMapping(path = "api")
@CrossOrigin({ "*", "http://localhost:4289" })
public class UserController {
	
	@Autowired
	private UserService svc;
	
	@Autowired
	private TemplateService tempSvc;
	
	@GetMapping("me")
	public User getUser(Principal principal) {
		User user = svc.findByUsername(principal.getName());
		return user;
	}
	
	@PutMapping("me")
	public User editUser(@RequestBody User user, Principal principal) {
		// principal allows us for check to see if we are updating the user thats is logged in.
		user.setUsername(principal.getName());
		user = svc.updateUser(user);
		return user;
	}
	
	
	
	@DeleteMapping("me")
	public Boolean deleteUser(Principal principal) {
		User user = svc.findByUsername(principal.getName());
		user.setEnabled(false);
		return false;
	}
	


}
