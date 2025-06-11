package com.democollege.demo.entity;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name="course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "description")
    private String description;

    @JsonIncludeProperties(value={"id","name"})
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JoinColumn(name = "teacher_id")
    private Teacher teacher;

    public void setId(Integer id){this.id = id;}
    public Integer getId(){return this.id;}

    public void setName(String name){this.name=name;}
    public String getName(){return this.name;}

    public void setDescription(String description){this.description=description;}
    public String getDescription(){return this.description;}

    public void setTeacher(Teacher teacher){this.teacher=teacher;}
    public Teacher getTeacher(){return this.teacher;}
}
