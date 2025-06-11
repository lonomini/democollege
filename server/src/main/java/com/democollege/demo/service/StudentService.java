package com.democollege.demo.service;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;

import com.democollege.demo.entity.Student;

@Component
public interface StudentService extends CrudRepository<Student, Integer>{
    Student findByEmail(String email);
}
