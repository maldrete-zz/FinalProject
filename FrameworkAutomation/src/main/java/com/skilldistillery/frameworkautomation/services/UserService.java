package com.skilldistillery.frameworkautomation.services;

import java.util.List;

import com.skilldistillery.frameworkautomation.entities.User;

public interface UserService {
	
//	/api/me
//	==> get request
//	==> put request
//	==> delete request
	
	
	public User updateUser(User updatedUser);
	
	public boolean deleteUser(String username);
	
	public boolean deactivateUser(String username);
	
	public boolean activateUser(String username);
	
	public User findByUsername(String username);
	
	public Integer addRating(String username, Integer templateId);
	
	public Boolean removeRating(String username, Integer templateId);
	
	public List<User> getAllUsers();
	

}
