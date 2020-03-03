package com.skilldistillery.frameworkautomation.services;

import java.io.Console;
import java.time.LocalDateTime;
import java.util.Optional;

import javax.print.attribute.standard.DateTimeAtCreation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.frameworkautomation.entities.Rating;
import com.skilldistillery.frameworkautomation.entities.Template;
import com.skilldistillery.frameworkautomation.entities.User;
import com.skilldistillery.frameworkautomation.repositories.RatingRepository;
import com.skilldistillery.frameworkautomation.repositories.TemplateRepository;
import com.skilldistillery.frameworkautomation.repositories.UserRepository;

@Service
public class UserServiceIMPL implements UserService {

	@Autowired
	private UserRepository repo;

	@Autowired
	private TemplateRepository tempRepo;

	@Autowired
	private RatingRepository ratingRepo;

	@Override
	public User updateUser(User updatedUser) {
//		Optional<User> managedUser = repo.findById(updatedUser.getUsername() );
//		updatedUser = managedUser.get();

		// check to see if updated user is ACTUALLY updated **************
		User olduser = repo.findByUsernameAndEnabledTrue(updatedUser.getUsername());

		if (updatedUser.getEmail() != null) {
			olduser.setEmail(updatedUser.getEmail());
		}
		if (updatedUser.getOrganizationName() != null) {
			olduser.setOrganizationName(updatedUser.getOrganizationName());
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

	@Override
	public Boolean addRating(String username, Integer templateId) {
		Boolean ratingWorked = false;
		User user = repo.findById(username).get();
		Template template = tempRepo.findById(templateId).get();

		Rating rating = ratingRepo.findByTemplate_idAndUser_Username(templateId, username);

		if (rating == null) {
			rating = new Rating();
			rating.setCreateDate(LocalDateTime.now().toString());

			template.addRating(rating);
			user.addRating(rating);
			ratingRepo.saveAndFlush(rating);

			if (rating != null) {
				ratingWorked = true;
			}

		} else if (rating != null) {
			removeRating(username, templateId);
			System.out.println("rating removed");
			
		}
		
		return ratingWorked;
	}

	@Override
	public Boolean removeRating(String username, Integer templateId) {
		Boolean ratingDeleted = false;

		User user = repo.findById(username).get();
		Template template = tempRepo.findById(templateId).get();

		Rating rating = ratingRepo.findByTemplate_idAndUser_Username(templateId, username);

		if (rating != null) {

			System.out.println(rating);

			template.removeRating(rating);
			user.removeRating(rating);

			ratingRepo.delete(rating);
			ratingDeleted = true;
		} else {
			ratingDeleted = false;
		}

		return ratingDeleted;
	}
}
