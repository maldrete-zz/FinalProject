package com.skilldistillery.frameworkautomation.entities;

import java.util.List;

public class TemplateInformation {
	// F I E L D S
	private Integer id;
	private String name;
	private String templateType;
	private String description;
	private String instructions;
	private String userName;
	private List<User> users;
	private List<Comment> comments;
	private List<Rating> ratings;

	// C O N S T R U C T O R S

	public TemplateInformation() {

	}

	public TemplateInformation(Template template) {
		this.id = template.getId();
		this.name = template.getName();
		this.templateType = template.getTemplateType();
		this.description = template.getDescription();
		this.instructions = template.getInstructions();
		this.userName = template.getUser().getUsername();
		this.users = template.getUsers();
		this.comments = template.getComments();
		this.ratings = template.getRatings();
	}

	// G E T T E R S _ A N D _ S E T T E R S

	public String getName() {
		return name;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTemplateType() {
		return templateType;
	}

	public void setTemplateType(String templateType) {
		this.templateType = templateType;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getInstructions() {
		return instructions;
	}

	public void setInstructions(String instructions) {
		this.instructions = instructions;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public List<Rating> getRatings() {
		return ratings;
	}

	public void setRatings(List<Rating> ratings) {
		this.ratings = ratings;
	}

}
