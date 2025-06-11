package com.democollege.demo.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.time.Instant;
import javax.crypto.SecretKey;

import java.util.Date;

public class JwtService {
    private final SecretKey secretKey;
    private final int validSeconds;
    private final JwtParser jwtParser;

    public JwtService(String secretKeyStr, int validSeconds) {
        this.secretKey = Keys.hmacShaKeyFor(secretKeyStr.getBytes());
        this.jwtParser = Jwts.parser().verifyWith(secretKey).build();
        this.validSeconds = validSeconds;
    }
    
    public String createLoginAccessToken(LoginUserDetails user){
        long expirationMillis = Instant.now()
                .plusSeconds(validSeconds)
                .getEpochSecond()
                * 1000;

        // payload content
        Claims claims = Jwts.claims()
                .issuedAt(new Date())
                .expiration(new Date(expirationMillis))
                .add("username", user.getUsername())
                .add("authorities", user.getAuthorities())
                .add("name", user.getName())
                .add("role", user.getRole().name())
                .build();

        // generate JWT
        return Jwts.builder()
                .claims(claims)
                .signWith(secretKey)
                .compact();
    
    }

    public Claims parseToken(String jwt) throws JwtException {
        return jwtParser.parseSignedClaims(jwt).getPayload();
    }
}
