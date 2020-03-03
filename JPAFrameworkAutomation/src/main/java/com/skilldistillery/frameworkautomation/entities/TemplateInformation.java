package com.skilldistillery.frameworkautomation.entities;


public class TemplateInformation {
	// F I E L D S
	private Integer id;
	private String name;
	private String templateType;
	private String description;
	private String instructions;
	private String userName;
	private Integer users;
	private Integer comments;
	private Integer ratings;

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
		this.users = template.getUsers().size();
		this.comments = template.getComments().size();
		this.ratings = template.getRatings().size();
		
	}

	public TemplateInformation(Integer id, String name, String templateType, String description, String instructions,
			String userName, Integer users, Integer comments, Integer ratings) {
		super();
		this.id = id;
		this.name = name;
		this.templateType = templateType;
		this.description = description;
		this.instructions = instructions;
		this.userName = userName;
		this.users = users;
		this.comments = comments;
		this.ratings = ratings;
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

	public Integer getUsers() {
		return users;
	}

	public void setUsers(Integer users) {
		this.users = users;
	}

	public Integer getComments() {
		return comments;
	}

	public void setComments(Integer comments) {
		this.comments = comments;
	}

	public Integer getRatings() {
		return ratings;
	}

	public void setRatings(Integer ratings) {
		this.ratings = ratings;
	}

}
