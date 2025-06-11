package com.democollege.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.security.core.Authentication;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;

import org.springframework.http.HttpHeaders;
import org.springframework.lang.NonNull;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    private static final List<String> EXCLUDED_PATHS = List.of("/", "/login");
    
    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsServiceImpl userDetailsServiceIml;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request, @NonNull HttpServletResponse response, 
                    @NonNull FilterChain filterChain) throws ServletException, IOException{
        
        String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);   

        if(authHeader != null && authHeader.startsWith("Bearer ")){
            String jwt = authHeader.substring(7);
            Claims claims;

            try{
                claims = jwtService.parseToken(jwt);
            }catch(JwtException exception){
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                return;
            }

            String username = claims.get("username", String.class);
            String role = claims.get("role", String.class);

            UserDetails userdetails = userDetailsServiceIml.loadUserByUsername(username+"["+role+"]");
            // var auth = new UsernamePasswordAuthenticationToken(username, userdetails.getPassword(), userdetails.getAuthorities());
            // SecurityContextHolder.getContext().setAuthentication(auth);

            Authentication token = new UsernamePasswordAuthenticationToken(
                userdetails,
                null,
                userdetails.getAuthorities()
            );
            SecurityContextHolder.getContext().setAuthentication(token);
            
        }  

        filterChain.doFilter(request, response);
    }

    @Override
    protected boolean shouldNotFilter(@NonNull HttpServletRequest request) throws ServletException {
        return EXCLUDED_PATHS.contains(request.getServletPath());
    }
}
