package com.skilldistillery.frameworkautomation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.frameworkautomation.entities.User;

public interface UserRepository extends JpaRepository<User, String> {
	
	public User findByUsernameAndEnabledTrue(String username);

}
