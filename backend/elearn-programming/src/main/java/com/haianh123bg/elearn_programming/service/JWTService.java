package com.haianh123bg.elearn_programming.service;

import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Date;

public interface JWTService {
    String generateToken(UserDetails user);

    String generateRefreshToken(UserDetails user);

    String extractUsername(String token);

    Claims parseToken(String token);

    boolean isValid(String token, UserDetails user);

    String generateTokenWithCustomTime(UserDetails user, Date expiration);

    String generateUpdateInfoToken(UserDetails userDetails);
}
