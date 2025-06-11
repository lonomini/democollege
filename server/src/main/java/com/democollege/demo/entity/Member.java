package com.democollege.demo.entity;

import java.util.List;

public interface Member {
    Integer getId();
    String getEmail();
    String getName();
    String getPassword();
    List<String> getAuthorities();
}
