package com.skilldistillery.frameworkautomation.repositories;

import java.util.List;

import javax.persistence.NamedQuery;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.skilldistillery.frameworkautomation.entities.Template;

public interface TemplateRepository extends JpaRepository<Template, Integer> {
	
	@Query("select template.name from Template template where template.enabled = true")
	List<String> findNamesofTemplates();
	

}
