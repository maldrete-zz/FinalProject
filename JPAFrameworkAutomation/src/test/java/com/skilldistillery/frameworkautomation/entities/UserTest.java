package com.skilldistillery.frameworkautomation.entities;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

class UserTest {

	private static EntityManagerFactory emf;
	private EntityManager em;
	private User user;

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
		user = em.find(User.class, "joe");
		
	}

	@AfterEach
	void tearDown() throws Exception {
		user = null;
		em.close();
	}
	
	
	@Test
	void test() {
		assertNotNull(user.getUsername());
//		assertEquals("nealabc",user.getUsername());
//		assertEquals("nealabc",user.getPassword());
//		assertEquals(true,user.getEnabled());
//		assertEquals("nealabc@aol.com",user.getEmail());
//		assertEquals(null,user.getRole());
//		assertEquals("Java Enitiy Mapping",user.getTemplates().get(0).getName());
		
	}
	

}
