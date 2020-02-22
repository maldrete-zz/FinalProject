package com.skilldistillery.frameworkautomation.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class TemplateTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private Template template;

	@BeforeAll
	static void setUpBeforeClass() throws Exception {
		emf = Persistence.createEntityManagerFactory("FrameworkAutomationPU");
	}

	@AfterAll
	static void tearDownAfterClass() throws Exception {
		emf.close();
	}

	@BeforeEach
	void setUp() throws Exception {
		em = emf.createEntityManager();
		template = em.find(Template.class, 2);

	}

	@AfterEach
	void tearDown() throws Exception {
		template = null;
		em.close();
	}

	@Test
	void test() {
		assertEquals("getter and setter", template.getName());
		assertEquals(null, template.getExtension());
		assertEquals("here is getter ans setter content", template.getContent());
		assertEquals(true, template.getAccess());
		assertEquals("Get and Set", template.getTemplateType());
		assertEquals(null, template.getDescription());
		assertEquals(null, template.getInstructions());
		assertEquals("james", template.getUser().getUsername());
		assertEquals("Java Enitiy Mapping", template.getParentTemplates().get(0).getName());
		assertEquals(2, template.getSubTemplates().size());
		assertEquals("getter", template.getSubTemplates().get(0).getName());

	}

}
