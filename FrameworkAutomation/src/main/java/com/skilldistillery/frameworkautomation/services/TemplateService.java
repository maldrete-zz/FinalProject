package com.skilldistillery.frameworkautomation.services;

import java.util.List;

import com.skilldistillery.frameworkautomation.entities.Template;
import com.skilldistillery.frameworkautomation.entities.TemplateInformation;

public interface TemplateService {

//	/api/templates
//	==> get single parent
//	==> get subs
//	==> post templates
//	==> put templates
//	==> delete template

//	public Template findParentTemplateByID(int id);
//	
//	public List<Template> findSubTemplates();
	

	public Template findTemplateById(Integer id);

	public Template updateTemplate(Template template, int id);

	public Template createTemplate(Template template);

	public boolean deleteTemplateById(int id);

	public List<TemplateInformation> getAllActiveTemplates();
	

}
