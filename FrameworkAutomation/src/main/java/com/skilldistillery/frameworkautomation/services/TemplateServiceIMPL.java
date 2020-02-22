package com.skilldistillery.frameworkautomation.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.frameworkautomation.entities.Template;
import com.skilldistillery.frameworkautomation.repositories.TemplateRepository;
import com.skilldistillery.frameworkautomation.repositories.UserRepository;

@Service
public class TemplateServiceIMPL implements TemplateService {
	
	@Autowired
	private TemplateRepository repo;
	
	@Autowired
	private UserRepository userRepo;

	@Override
	public Template findParentTemplateByID(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Template> findSubTemplates() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Template updateTemplate(Template template, int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Template createTemplate(Template template) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public boolean deleteTemplateById(int id) {
		// TODO Auto-generated method stub
		return false;
	}
	
	


	
	

}
