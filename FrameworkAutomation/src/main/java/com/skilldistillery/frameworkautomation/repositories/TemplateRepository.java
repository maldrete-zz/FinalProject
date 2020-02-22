package com.skilldistillery.frameworkautomation.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.skilldistillery.frameworkautomation.entities.template;

public interface TemplateRepository extends JpaRepository<Template, Integer> {

}
