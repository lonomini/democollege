package com.democollege.demo.component;

public class LoginResponse {
    private Integer id;
    private String name;
    private String token;

    public LoginResponse(Integer id, String name, String token){
        this.id = id;
        this.name = name;
        this.token = token;
    }

    public Integer getId(){return this.id;}

    public String getName(){return this.name;}

    public String getToken(){return this.token;}
}
