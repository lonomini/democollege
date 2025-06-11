package com.democollege.demo.component;

public class CourseAddRequest {
    private String name;
    private String description;
    private Integer teacherId;

    public void setName(String name){this.name=name;}
    public String getName(){return this.name;}

    public void setDescription(String description){this.description=description;}
    public String getDescription(){return this.description;}

    public void setTeacherId(Integer teacherId){this.teacherId=teacherId;}
    public Integer getTeacherId(){return this.teacherId;}
}
