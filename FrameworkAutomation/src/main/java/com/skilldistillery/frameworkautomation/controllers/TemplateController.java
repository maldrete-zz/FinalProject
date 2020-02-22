package com.skilldistillery.frameworkautomation.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

}
