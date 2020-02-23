package com.skilldistillery.frameworkautomation.services;

import com.skilldistillery.frameworkautomation.entities.User;

public interface AuthService {
	public User register(User user);
	public User getUserbyUsername(String username);
}
