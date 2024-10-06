package com.haianh123bg.elearn_programming.configuration;

import com.haianh123bg.elearn_programming.service.JWTService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@Slf4j
@RequiredArgsConstructor
public class PreFilter extends OncePerRequestFilter {

    // JWT service to handle token validation and extraction of claims
    private final JWTService jwtService;

    // Service to load user details from the database or another source
    private final UserDetailsService userDetailsService;

    /**
     * This method filters each request to check for a valid JWT token.
     * If a valid token is found, it sets the authentication context for the request.
     *
     * @param request     The HTTP request object.
     * @param response    The HTTP response object.
     * @param filterChain The filter chain for further request processing.
     * @throws ServletException If an error occurs during filtering.
     * @throws IOException      If an I/O error occurs during filtering.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        log.info("----------PreFilter---------");

        // Retrieve the Authorization header from the request
        final String authorization = request.getHeader("Authorization");

        // If the Authorization header is blank or doesn't start with "Bearer ", continue the filter chain
        if (StringUtils.isBlank(authorization) || !authorization.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        try {
            final String token = authorization.substring("Bearer ".length());

            Claims claims = jwtService.parseToken(token);
            final String userName = claims.getSubject();
            final String typeToken = claims.get("type", String.class);

            if (StringUtils.isNoneEmpty(userName) && SecurityContextHolder.getContext().getAuthentication() == null) {
                UserDetails userDetails = userDetailsService.loadUserByUsername(userName);
                if (jwtService.isValid(token, userDetails)) {
                    SecurityContext context = SecurityContextHolder.createEmptyContext();
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, userDetails.getAuthorities());
                    authentication.setDetails(typeToken);
                    context.setAuthentication(authentication);
                    SecurityContextHolder.setContext(context);
                }
            }
        } catch (Exception e) {
            log.error(e.getMessage());
        }

        // Continue processing the filter chain
        filterChain.doFilter(request, response);
    }
}
