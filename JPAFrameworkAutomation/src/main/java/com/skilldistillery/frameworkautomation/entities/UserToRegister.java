package com.skilldistillery.frameworkautomation.entities;

public class UserToRegister {

	private String username;

	private String password;

	private String email;

	private String organizationName;

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	@Override
	public String toString() {
		return "UserToRegister [username=" + username + ", password=" + password + ", email=" + email
				+ ", organizationName=" + organizationName + "]";
	}

	public UserToRegister() {

	}

	public UserToRegister(String username, String password, String email, String organizationName) {
		super();
		this.username = username;
		this.password = password;
		this.email = email;
		this.organizationName = organizationName;
	}

}
