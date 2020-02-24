package com.skilldistillery.frameworkautomation.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.JoinColumn;
import java.util.List;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.ArrayList;
import javax.persistence.OneToMany;
import javax.persistence.JoinTable;

@Entity
@Table(name = "template")
public class Template {

	// F I E L D S
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;

	@Column(name = "name")
	private String name;

	@Column(name = "extension")
	private String extension;

	@Column(name = "content")
	private String content;

	@Column(name = "access")
	private Boolean access;

	@Column(name = "template_type")
	private String templateType;

	@Column(name = "description")
	private String description;

	@Column(name = "instructions")
	private String instructions;
	
	@Column(name = "enabled")
	private Boolean enabled;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "user_username")
	private User user;

	@ManyToMany(mappedBy = "favorites")
	private List<User> users;

	@OneToMany(mappedBy = "template")
	private List<Comment> comments;

	@ManyToMany
	@JoinTable(name = "parent_child_template", joinColumns = @JoinColumn(name = "parent_id"), inverseJoinColumns = @JoinColumn(name = "child_id"))
	private List<Template> subTemplates;

	@JsonIgnore
	@ManyToMany(mappedBy = "subTemplates")
	private List<Template> parentTemplates;

	@OneToMany(mappedBy = "template")
	private List<Rating> ratings;

	// C O N S T R U C T O R S
	public Template() {
		super();
	}

	// G E T T E R S _ A N D _ S E T T E R S
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Boolean getAccess() {
		return access;
	}

	public void setAccess(Boolean access) {
		this.access = access;
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

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<User> getUsers() {
		return users;
	}

	public void setUsers(List<User> users) {
		this.users = users;
	}



	public List<Template> getSubTemplates() {
		return subTemplates;
	}

	public void setSubTemplates(List<Template> subTemplates) {
		this.subTemplates = subTemplates;
	}

	public List<Rating> getRatings() {
		return ratings;
	}

	public void setRatings(List<Rating> ratings) {
		this.ratings = ratings;
	}

	public List<Template> getParentTemplates() {
		return parentTemplates;
	}

	public void setParentTemplates(List<Template> parentTemplates) {
		this.parentTemplates = parentTemplates;
	}

	public Boolean getEnabled() {
		return enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public List<Comment> getComments() {
		return comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	// A D D E R S
	public void addUser(User user) {
		if (users == null) {
			users = new ArrayList<>();
		}
		if (!users.contains(user)) {
			users.add(user);
			user.addTemplate(this);
		}
	}

	public void removeUser(User user) {
		if (users != null && users.contains(user)) {
			users.remove(user);
			user.removeTemplate(this);
		}

	}

	public void addComment(Comment comment) {
		if (comments == null) {
			comments = new ArrayList<>();
		}
		if (!comments.contains(comment)) {
			comments.add(comment);
			if (comment.getTemplate() != null) {
				comment.getTemplate().getComments().remove(comment);
			}
		}
		comment.setTemplate(this);
	}

	public void removeComment(Comment comment) {
		comment.setTemplate(null);
		if (comments != null) {
			comments.remove(comment);
		}

	}

	public void addParentTemplate(Template parentTemplate) {
		if (parentTemplates == null) {
			parentTemplates = new ArrayList<>();
		}
		if (!parentTemplates.contains(parentTemplate)) {
			parentTemplates.add(parentTemplate);
			parentTemplate.addSubTemplate(this);
		}
	}

	public void removeParentTemplate(Template parentTemplate) {
		if (parentTemplates != null && parentTemplates.contains(parentTemplate)) {
			parentTemplates.remove(parentTemplate);
			parentTemplate.removeSubTemplate(this);
		}

	}

	public void addSubTemplate(Template subTemplate) {
		if (subTemplates == null) {
			subTemplates = new ArrayList<>();
		}
		if (!subTemplates.contains(subTemplate)) {
			subTemplates.add(subTemplate);
			subTemplate.addParentTemplate(this);
		}
	}

	public void removeSubTemplate(Template subTemplate) {
		if (subTemplates != null && subTemplates.contains(subTemplate)) {
			subTemplates.remove(subTemplate);
			subTemplate.removeParentTemplate(this);
		}

	}

	public void addRating(Rating rating) {
		if (ratings == null) {
			ratings = new ArrayList<>();
		}
		if (!ratings.contains(rating)) {
			ratings.add(rating);
			if (rating.getTemplate() != null) {
				rating.getTemplate().getRatings().remove(rating);
			}
		}
		rating.setTemplate(this);
	}

	public void removeRating(Rating rating) {
		rating.setTemplate(null);
		if (ratings != null) {
			ratings.remove(rating);
		}

	}

}
