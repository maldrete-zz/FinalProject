package com.skilldistillery.frameworkautomation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.frameworkautomation.entities.Rating;

public interface RatingRepository extends JpaRepository<Rating, Integer> {
	
	public Rating findByTemplate_idAndUser_Username(Integer templateId, String username);
}
