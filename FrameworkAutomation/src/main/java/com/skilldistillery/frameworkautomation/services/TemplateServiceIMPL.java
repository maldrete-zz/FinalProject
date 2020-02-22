package com.skilldistillery.frameworkautomation.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.frameworkautomation.repositories.TemplateRepository;
import com.skilldistillery.frameworkautomation.repositories.UserRepository;

@Service
public class TemplateServiceIMPL implements TemplateService {
	
	@Autowired
	private TemplateRepository repo;
	
	@Autowired
	private UserRepository userRepo;

}
