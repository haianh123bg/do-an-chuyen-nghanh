package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.Set;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
    private Integer userId;
    private LocalDateTime expires;
    private Set<String> roles;
}
