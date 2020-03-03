package com.skilldistillery.frameworkautomation.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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
	
	@Autowired
	private PasswordEncoder encoder;

	@Override
	public User updateUser(User updatedUser) {
//		Optional<User> managedUser = repo.findById(updatedUser.getUsername() );
//		updatedUser = managedUser.get();

		// check to see if updated user is ACTUALLY updated **************
		User olduser = repo.findByUsernameAndEnabledTrue(updatedUser.getUsername());
		System.out.println(updatedUser);
		if (updatedUser.getEmail() != null) {
			olduser.setEmail(updatedUser.getEmail());
		}
		if (updatedUser.getOrganizationName() != null) {
			olduser.setOrganizationName(updatedUser.getOrganizationName());
		}
		if (updatedUser.getPassword() != null) {
			System.out.println("hello im in password");
			String encodedPW = encoder.encode(updatedUser.getPassword());
			olduser.setPassword(encodedPW); // only persist encoded password

		}
		repo.saveAndFlush(olduser);
		return olduser;
	}

	@Override
	public boolean deleteUser(String username) {
		User user = repo.findByUsernameAndEnabledTrue(username);
		user.setEnabled(false);
		return false;
	}

	@Override
	public User findByUsername(String username) {
		User user = repo.findByUsernameAndEnabledTrue(username);
		// check to see if managed user password is empty string *******************888
		return user;
	}

}
