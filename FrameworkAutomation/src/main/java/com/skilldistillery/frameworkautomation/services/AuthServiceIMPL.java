package com.skilldistillery.frameworkautomation.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.skilldistillery.frameworkautomation.entities.User;
import com.skilldistillery.frameworkautomation.repositories.UserRepository;

@Service
public class AuthServiceIMPL implements AuthService {

	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private UserRepository repo;

	@Override
	public User register(User user) {
		Optional<User> optionalUser = repo.findById(user.getUsername());
		if(optionalUser.isPresent()) {
			throw new RuntimeException("Username alreadys exists");
		}
		String encodedPW = encoder.encode(user.getPassword());
		user.setPassword(encodedPW); // only persist encoded password

		// set other fields to default values
		user.setEnabled(true);
		user.setRole("standard");
		System.err.println("In rencodedpw" + encodedPW);

		repo.saveAndFlush(user);
		return user;
	}

	@Override
	public User getUserbyUsername(String username) {
		return repo.findByUsernameAndEnabledTrue(username);
	}

}
