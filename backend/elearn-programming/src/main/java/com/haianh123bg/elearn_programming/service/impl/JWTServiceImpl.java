package com.haianh123bg.elearn_programming.service.impl;

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

@Service
public class JWTServiceImpl implements JWTService {

    @Value("${jwt.access-token}")
    private int timeAccessToken;

    @Value("${jwt.refresh-token}")
    private int timeRefreshToken;

    @Value("${jwt.token.secretKey}")
    private String secretKey;

    @Override
    public String generateToken(UserDetails user) {
        return generateCustomToken(new HashMap<>(), user, TypeTokenEnum.ACCESS, timeAccessToken);
    }

    @Override
    public String generateRefreshToken(UserDetails user) {
        return generateCustomToken(new HashMap<>(), user, TypeTokenEnum.ACCESS, timeRefreshToken);
    }

    @Override
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    @Override
    public Claims parseToken(String token) {
        return extraAllClaim(token);
    }

    @Override
    public boolean isValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        final Date expiration = extractExpiration(token);

        return (username.equals(userDetails.getUsername()) && !isTokenExpired(expiration));
    }

    @Override
    public String generateTokenWithCustomTime(UserDetails user, Date expiration) {
        return generateTokenCustomTime(new HashMap<>(), user, expiration);
    }

    @Override
    public String generateUpdateInfoToken(UserDetails userDetails) {
        return generateCustomToken(new HashMap<>(), userDetails, TypeTokenEnum.UPDATE_INFO, 1);
    }

    private String generateCustomToken(Map<String, Object> claims, UserDetails userDetails, TypeTokenEnum tokenType, int timeoutHours) {
        claims.put("type", tokenType.name());  // Thêm claim để xác định loại token (ví dụ: transaction, password_reset, etc.)
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())  // Đặt username vào subject
                .setIssuedAt(new Date(System.currentTimeMillis()))  // Thời gian phát hành token
                .setExpiration(new Date(System.currentTimeMillis() + 1000L * 60 * 60 * timeoutHours))  // Đặt thời gian hết hạn
                .signWith(getKey(), SignatureAlgorithm.HS256)  // Ký với secret key
                .compact();
    }


    private <T> T extractClaim(String token, Function<Claims, T> claimResolve) {
        final Claims claims = extraAllClaim(token);
        return claimResolve.apply(claims);
    }

    private Claims extraAllClaim(String token) {
        return Jwts.parserBuilder().setSigningKey(getKey()).build().parseClaimsJws(token).getBody();
    }

    private String generateTokenCustomTime(Map<String, Object> claims, UserDetails userDetails, Date expiration) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(expiration)
                .signWith(getKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private boolean isTokenExpired(Date expiration) {
        return expiration.before(new Date());
    }

    private SecretKey getKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
