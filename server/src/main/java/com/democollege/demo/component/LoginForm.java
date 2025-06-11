package com.democollege.demo.component;

import com.democollege.demo.entity.Role;

public class LoginForm {
    private String email;
    private String password;
    private Role role;

    public void setEmail(String email){this.email=email;}
    public String getEmail(){return this.email;}

    public void setPassword(String password){this.password=password;}
    public String getPassword(){return this.password;}

    public void setRole(Role role){ this.role=role;}
    public Role getRole(){return this.role;}
}
