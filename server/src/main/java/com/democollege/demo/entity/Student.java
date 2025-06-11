package com.democollege.demo.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import java.util.Date;

@Entity
@Table(name = "student")
public class Student implements Member{
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

    @Column(name = "authorities", nullable = false)
    private List<String> authorities;

    @Column(name = "dob", nullable = false)
    private Date dob;

    @Column(name = "telephone", nullable = false)
    private String telephone;

    @Column(name = "gender", nullable = false)
    private String gender;

    @ManyToMany(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST})
    @JoinTable(
        name = "student_course",
        joinColumns = @JoinColumn(name = "student_id", referencedColumnName = "id"),
        inverseJoinColumns = @JoinColumn(name = "course_id", referencedColumnName = "id"),
        uniqueConstraints = @UniqueConstraint(columnNames = {"student_id", "course_id"})
    )
    private List<Course> courses;

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

    public void setDob(Date dob){this.dob=dob;}
    public Date getDob(){return this.dob;}

    public void setTelephone(String telephone){this.telephone=telephone;}
    public String getTelephone(){return this.telephone;}

    public void setGender(String gender){this.gender=gender;}
    public String getGender(){return this.gender;}

    public void setCourses(List<Course> courses){this.courses = courses;}
    public List<Course> getCourses(){return this.courses;}

}
