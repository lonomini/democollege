package com.democollege.demo.service;

import org.springframework.data.repository.CrudRepository;

import com.democollege.demo.entity.Staff;


public interface StaffServcie extends CrudRepository<Staff, Integer>{
    Staff findByEmail(String email);
}
