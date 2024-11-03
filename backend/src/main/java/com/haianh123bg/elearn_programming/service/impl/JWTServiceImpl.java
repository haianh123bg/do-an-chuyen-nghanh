package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.service.JWTService;
import com.haianh123bg.elearn_programming.utils.TypeTokenEnum;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import javax.crypto.SecretKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class JWTServiceImpl implements JWTService {

    private static final Logger log = LoggerFactory.getLogger(JWTServiceImpl.class);

    @Value("${jwt.access-token}")
    private int timeAccessToken;

    @Value("${jwt.refresh-token}")
    private int timeRefreshToken;

    @Value("${jwt.reset-password-token}")
    private int timeResetPasswordToken;

    @Value("${jwt.token.secretKey}")
    private String secretKey;

    @Override
    public String generateToken(UserDetails user) {
        return generateCustomToken(new HashMap<>(), user, TypeTokenEnum.ACCESS, timeAccessToken);
    }

    @Override
    public String generateRefreshToken(UserDetails user) {
        return generateCustomToken(new HashMap<>(), user, TypeTokenEnum.REFRESH, timeRefreshToken);
    }

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public Claims parseToken(String token) {
        return extractAllClaims(token);
    }

    @Override
    public boolean isValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        final Date expiration = extractExpiration(token);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(expiration));
    }

    @Override
    public String generateUpdateInfoToken(UserDetails userDetails) {
        return generateCustomToken(new HashMap<>(), userDetails, TypeTokenEnum.UPDATE_INFO, 1);
    }

    @Override
    public String generateResetPasswordToken(UserDetails userDetails) {
        return generateCustomToken(new HashMap<>(), userDetails, TypeTokenEnum.PASSWORD_RESET, timeResetPasswordToken);
    }

    private String generateCustomToken(Map<String, Object> claims, UserDetails userDetails, TypeTokenEnum tokenType, int timeoutHours) {
        claims.put("type", tokenType.name());
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * timeoutHours))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims = extractAllClaims(token);
        return claimResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        try {
            return Jwts.parserBuilder().setSigningKey(getSigningKey()).build().parseClaimsJws(token).getBody();
        } catch (Exception e) {
            log.error("Error parsing token: {}", token, e);
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
