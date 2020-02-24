package com.skilldistillery.frameworkautomation.controllers;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.frameworkautomation.entities.Template;
import com.skilldistillery.frameworkautomation.entities.User;
import com.skilldistillery.frameworkautomation.services.TemplateService;
import com.skilldistillery.frameworkautomation.services.UserService;

@RestController
@RequestMapping(path = "api")
@CrossOrigin({ "*", "http://localhost:4289" })
public class TemplateController {

	@Autowired
	private TemplateService svc;

	@Autowired
	private UserService userSvc;

	@PostMapping("templates")
	public Template createTemplate(@RequestBody Template template, Principal principal) {
		User user = userSvc.findByUsername(principal.getName());
		template.setUser(user);

		Template newTemplate = svc.createTemplate(template);

		return newTemplate;
	}

	@PutMapping("templates")
	public Template editTemplate(@RequestBody Template template, Principal principal) {
		Template oldTemplate = svc.findTemplateById(template.getId());
		if (oldTemplate.getUser().getUsername().equals(principal.getName())) {
			Template newTemplate = svc.updateTemplate(template, oldTemplate.getId());
			return newTemplate;
		} else {
			throw new RuntimeException("You dont own this template");
		}

	}

	@GetMapping("templates/{id}")
	public Template findTemplateById(@PathVariable Integer id, Principal principal) {
		return svc.findTemplateById(id);
	}

	@DeleteMapping("templates/{id}")
	public Boolean deleteTemplateById(@PathVariable Integer id, Principal principal) {
		Template template = svc.findTemplateById(id);
		if (template.getUser().getUsername().equals(principal.getName())) {
			svc.deleteTemplateById(id);
			return true;
		} else {
			return false;
		}
	}

}
