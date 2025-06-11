package com.democollege.demo.service;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import com.democollege.demo.entity.Teacher;

@Component
public interface TeacherService extends CrudRepository<Teacher, Integer>{
    Teacher findByEmail(String email);
}
