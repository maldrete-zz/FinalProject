package com.skilldistillery.frameworkautomation.services;

import com.skilldistillery.frameworkautomation.entities.User;

public interface UserService {
	
//	/api/me
//	==> get request
//	==> put request
//	==> delete request
	
	public User findUserByID(int id);
	
	public User updateUser(User user, int id);
	
	public boolean deleteUser(int id);
	
	public User findByUsername(String username);
	

}
