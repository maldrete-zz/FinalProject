package com.skilldistillery.frameworkautomation.services;

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
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public User updateUser(User user, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteUser(int id) {
		// TODO Auto-generated method stub
		return false;
	}

	
	


}
