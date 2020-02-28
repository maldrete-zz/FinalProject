package com.skilldistillery.frameworkautomation.services;

import java.util.List;
import java.util.Optional;

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
	public List<String> getAllActiveTemplates() {
		return repo.findNamesofTemplatesAndDescription();
	}

	@Override
	public Template updateTemplate(Template newTemplate, int id) {
		Optional<Template> managedTemplate = repo.findById(id);
		if (managedTemplate.isPresent()) {
			Template oldTemplate = managedTemplate.get();

			if (newTemplate.getName() != null) {
				oldTemplate.setName(newTemplate.getName());
			}
			if (newTemplate.getExtension() != null) {
				oldTemplate.setExtension(newTemplate.getExtension());
			}
			if (newTemplate.getContent() != null) {
				oldTemplate.setContent(newTemplate.getContent());
			}
			if (newTemplate.getTemplateType() != null) {
				oldTemplate.setTemplateType(newTemplate.getTemplateType());
			}
			if (newTemplate.getDescription() != null) {
				oldTemplate.setDescription(newTemplate.getDescription());
			}
			if (newTemplate.getAccess() != null) {
				oldTemplate.setAccess(newTemplate.getAccess());
			}
			if (newTemplate.getInstructions() != null) {
				oldTemplate.setInstructions(newTemplate.getInstructions());
			}
			if (newTemplate.getSubTemplates() != null) {
				oldTemplate.setSubTemplates(newTemplate.getSubTemplates());
			}
			if (newTemplate.getParentTemplates() != null) {
				oldTemplate.setParentTemplates(newTemplate.getParentTemplates());
			}

			newTemplate = repo.saveAndFlush(oldTemplate);
			return newTemplate;

		} else {
			throw new RuntimeException("template not found");
		}

	}

	@Override
	public Template createTemplate(Template template) {
		template.setId(0);
		Template newTemplate = repo.saveAndFlush(template);
		return newTemplate;
	}

	@Override
	public boolean deleteTemplateById(int id) {

		Optional<Template> managedTemplate = repo.findById(id);
		if (managedTemplate.isPresent()) {
			Template template = managedTemplate.get();
			if (template.getParentTemplates().size() == 0) {
				repo.delete(template);
			} else {
				template.setEnabled(false);
				repo.saveAndFlush(template);
			}
			return true;
		} else {
			throw new RuntimeException("template not found");
		}
	}

	@Override
	public Template findTemplateById(Integer id) {
		Optional<Template> managedTemplate = repo.findById(id);
		if (managedTemplate.isPresent()) {

			return managedTemplate.get();
		} else {
			throw new RuntimeException("id not found");
		}

	}

}
