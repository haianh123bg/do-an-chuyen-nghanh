package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String accessToken;
    private String refreshToken;
    private Integer userId;
    private LocalDateTime expires;
    private List<String> roles;
}
