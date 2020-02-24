package com.skilldistillery.frameworkautomation.controllers;

import java.security.Principal;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.frameworkautomation.entities.User;
import com.skilldistillery.frameworkautomation.services.AuthService;

@RestController
@CrossOrigin({ "*", "http://localhost:4200" })
public class AuthController {
	@Autowired
	private AuthService authService;

	@PostMapping("/register")
	public User register(@RequestBody User user, HttpServletResponse res) {

		System.out.println(user);
		if (user == null) {
			res.setStatus(400);
		}

		user = authService.register(user);
		user.setPassword("");

		return user;
	}

	@GetMapping("/authenticate")
	public Boolean authenticate(Principal principal) {
		User user = authService.getUserbyUsername(principal.getName());
		if (user == null) {
			return false;
		} else {
			return true;
		}

	}

}
