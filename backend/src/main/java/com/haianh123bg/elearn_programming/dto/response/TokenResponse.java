package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class TokenResponse {
    private String token;
    private LocalDateTime expires;
}
