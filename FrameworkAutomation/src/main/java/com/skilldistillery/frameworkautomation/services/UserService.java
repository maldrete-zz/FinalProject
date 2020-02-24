package com.skilldistillery.frameworkautomation.services;

import com.skilldistillery.frameworkautomation.entities.User;

public interface UserService {
	
//	/api/me
//	==> get request
//	==> put request
//	==> delete request
	
	
	public User updateUser(User updatedUser);
	
	public boolean deleteUser(String username);
	
	public User findByUsername(String username);
	

}
