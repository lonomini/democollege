package com.democollege.demo.security;

import java.util.Collection;
import java.util.HashSet;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.democollege.demo.entity.Member;
import com.democollege.demo.entity.Role;

public class LoginUserDetails implements UserDetails{

    private Member member;

    private Role role;

    public LoginUserDetails(Member member, Role role){
        this.member = member;
        this.role = role;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        Collection<GrantedAuthority> auths = new HashSet<>();
        member.getAuthorities().forEach(auth->auths.add(new SimpleGrantedAuthority(auth)));
        return auths;
    }

    @Override
    public String getPassword() {
        return this.member.getPassword();
    }

    @Override
    public String getUsername() {
        return this.member.getEmail();
    }

    /// other fields
    public String getName(){
        return this.member.getName();
    }    

    public Role getRole(){
        return this.role;
    }
    
    public Integer getId(){
        return member.getId();
    }
}
