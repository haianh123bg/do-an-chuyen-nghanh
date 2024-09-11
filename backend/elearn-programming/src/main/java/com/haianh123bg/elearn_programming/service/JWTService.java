package com.haianh123bg.elearn_programming.service;

import org.springframework.security.core.userdetails.UserDetails;

public interface JWTService {
    String generateToken(UserDetails user);

    String generateRefreshToken(UserDetails user);

    String extractUsername(String token);

    boolean isValid(String token, UserDetails user);

    String extractEmail(String token);

    String extractRoles(String token);
}
