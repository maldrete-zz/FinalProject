package com.skilldistillery.frameworkautomation.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import java.util.List;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import java.util.ArrayList;
import javax.persistence.OneToMany;
import javax.persistence.JoinTable;


@Entity
@Table(name="user")
public class User {

	// F I E L D S
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;


	@Column(name = "username")
	private String username;


	@Column(name = "password")
	private String password;


	@Column(name = "enabled")
	private Boolean enabled;


	@Column(name = "email")
	private String email;


	@Column(name = "organization_id")
	private Integer organizationId;


	@Column(name = "role")
	private String role;


	@OneToMany(mappedBy="user")
	private List<Template> templates;


	@ManyToMany
	@JoinTable(name="favorites",
		joinColumns=@JoinColumn(name="user_id"),
		inverseJoinColumns=@JoinColumn(name="template_id")
	)
	private List<Template> favorites;


	@OneToMany(mappedBy="user")
	private List<Comments> commentss;


	@OneToMany(mappedBy="user")
	private List<Rating> ratings;



	
	// C O N S T R U C T O R S
	public User() {
		super();
	}



	// G E T T E R S _ A N D _ S E T T E R S
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}

	public Boolean getEnabled() {
		return enabled;
	}
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}


	public Integer getOrganizationId() {
		return organizationId;
	}
	public void setOrganizationId(Integer organizationId) {
		this.organizationId = organizationId;
	}

	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}

	public List<Template> getTemplates() {
		return templates;
	}
	public void setTemplates(List<Template> templates) {
		this.templates = templates;
	}

	public List<Template> getFavorites() {
		return favorites;
	}
	public void setFavorites(List<Template> favorites) {
		this.favorites = favorites;
	}

	public List<Comments> getCommentss() {
		return commentss;
	}
	public void setCommentss(List<Comments> commentss) {
		this.commentss = commentss;
	}

	public List<Rating> getRatings() {
		return ratings;
	}
	public void setRatings(List<Rating> ratings) {
		this.ratings = ratings;
	}



	// A D D E R S
	public void addTemplate (Template template) {
		if (templates == null) {
			templates = new ArrayList<>();
		}
		if (!templates.contains(template)) {
			templates.add(template);
			if(template.getUser() != null){
				template.getUser().getTemplates().remove(template);
			}
		}
			template.setUser(this);
	}
	
	public void removeTemplate(Template template){
		template.setUser(null);
		if(templates != null){
			templates.remove(template);
		}
	
	}
	
	public void addFavorite (Template favorite) {
		if (favorites == null) {
			favorites = new ArrayList<>();
		}
		if (!favorites.contains(favorite)) {
			favorites.add(favorite);
			favorite.addUser(this);
		}
	}
	
	
	public void removeFavorite(Template favorite){
		if(favorites != null && favorites.contains(favorite)){
			favorites.remove(favorite);
			favorite.removeUser(this);
		}
	
	}
	public void addComments (Comments comments) {
		if (commentss == null) {
			commentss = new ArrayList<>();
		}
		if (!commentss.contains(comments)) {
			commentss.add(comments);
			if(comments.getUser() != null){
				comments.getUser().getCommentss().remove(comments);
			}
		}
			comments.setUser(this);
	}
	
	public void removeComments(Comments comments){
		comments.setUser(null);
		if(commentss != null){
			commentss.remove(comments);
		}
	
	}
	
	public void addRating (Rating rating) {
		if (ratings == null) {
			ratings = new ArrayList<>();
		}
		if (!ratings.contains(rating)) {
			ratings.add(rating);
			if(rating.getUser() != null){
				rating.getUser().getRatings().remove(rating);
			}
		}
			rating.setUser(this);
	}
	
	public void removeRating(Rating rating){
		rating.setUser(null);
		if(ratings != null){
			ratings.remove(rating);
		}
	
	}
	

	
}	

