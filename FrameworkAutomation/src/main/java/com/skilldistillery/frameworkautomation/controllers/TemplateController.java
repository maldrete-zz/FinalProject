package com.skilldistillery.frameworkautomation.controllers;

import java.security.Principal;
import java.util.List;

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
import com.skilldistillery.frameworkautomation.entities.TemplateInformation;
import com.skilldistillery.frameworkautomation.entities.User;
import com.skilldistillery.frameworkautomation.repositories.TemplateRepository;
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
	
	@Autowired
	private TemplateRepository tempRepo;

	@GetMapping("templates")
	public List<TemplateInformation> findAllTemplates() {
		return svc.getAllActiveTemplates(); // gets template names
	}
	
	@GetMapping("templates/search/{keyword}")
	public List<Template> findTemplateByKeyword(@PathVariable String keyword) {
		return tempRepo.findByNameLike("%"+keyword+"%"); // gets template names
	}
	
	@PostMapping("templates")
	public Template createTemplate(@RequestBody Template template, Principal principal) {
		User user = userSvc.findByUsername(principal.getName());
		template.setUser(user);
		template.setAccess(true);
		template.setEnabled(true);
		Template newTemplate = svc.createTemplate(template);

		return newTemplate;
	}

	@PutMapping("templates/{id}")
	public Template editTemplate(@PathVariable Integer id,@RequestBody Template template, Principal principal) {
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

	@PutMapping("templates/{id}/subtemplates/{subId}")
	public Template addSubtemplateToTemplate(@PathVariable Integer id, @PathVariable Integer subId,
			Principal principal) {
		Template parentTemplate = svc.findTemplateById(id);
		Template subTemplate = svc.findTemplateById(subId);

		if (parentTemplate.getUser().getUsername().equals(principal.getName())) {
			parentTemplate.addSubTemplate(subTemplate);
			svc.updateTemplate(parentTemplate, id);
			svc.updateTemplate(subTemplate, subId);
			return parentTemplate;

		} else {
			throw new RuntimeException("You do not own this template");
		}
	}

	@DeleteMapping("templates/{id}/subtemplates/{subId}")
	public Template deleteSubtemplateToTemplate(@PathVariable Integer id, @PathVariable Integer subId,
			Principal principal) {
		Template parentTemplate = svc.findTemplateById(id);
		Template subTemplate = svc.findTemplateById(subId);

		if (parentTemplate.getUser().getUsername().equals(principal.getName())) {
			parentTemplate.removeSubTemplate(subTemplate);
			svc.updateTemplate(parentTemplate, id);
			svc.updateTemplate(subTemplate, subId);
			return parentTemplate;

		} else {
			throw new RuntimeException("You do not own this template");
		}
	}

}
