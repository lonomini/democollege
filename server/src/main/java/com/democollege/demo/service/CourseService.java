package com.democollege.demo.service;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import com.democollege.demo.entity.Course;

@Component
public interface CourseService extends CrudRepository<Course, Integer>{
    
}
