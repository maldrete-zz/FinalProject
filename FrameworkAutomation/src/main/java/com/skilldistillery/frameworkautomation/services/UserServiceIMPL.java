package com.skilldistillery.frameworkautomation.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.frameworkautomation.entities.User;
import com.skilldistillery.frameworkautomation.repositories.TemplateRepository;
import com.skilldistillery.frameworkautomation.repositories.UserRepository;

@Service
public class UserServiceIMPL implements UserService {

	@Autowired
	private UserRepository repo;

	@Autowired
	private TemplateRepository tempRepo;

	@Override
	public User findUserByID(int id) {
		Optional<User> userOptional = repo.findById(id);
		User user = userOptional.get();
		return user;
	}

	@Override
	public User updateUser(User user, int id) {
		User managedUser = findUserByID(id);
		managedUser = repo.saveAndFlush(user);
		return managedUser;
	}

	@Override
	public boolean deleteUser(int id) {
		// TODO
		return false;
	}

	@Override
	public User findByUsername(String username) {
		User user = repo.findByUsername(username);
		user.setPassword("");
		return user;
	}

}
