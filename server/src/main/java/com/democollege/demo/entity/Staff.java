package com.democollege.demo.entity;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "staff")
public class Staff implements Member{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "password", nullable = false)
    @JsonProperty(access = Access.WRITE_ONLY)
    private String password;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "telephone")
    private String telephone;

    @Column(name = "authorities", nullable = false)
    private List<String> authorities;

    public void setId(Integer id){this.id = id;}
    public Integer getId(){return this.id;}

    public void setEmail(String email){this.email=email;}
    public String getEmail(){return this.email;}

    public void setPassword(String password){this.password=password;}
    public String getPassword(){return this.password;}

    public void setName(String name){this.name=name;}
    public String getName(){return this.name;}
    
    public void setAuthorities(List<String> authorities){this.authorities=authorities;}
    public List<String> getAuthorities(){return this.authorities;}

    public void setTelephone(String telephone){this.telephone=telephone;}
    public String getTelephone(){return this.telephone;}
}
