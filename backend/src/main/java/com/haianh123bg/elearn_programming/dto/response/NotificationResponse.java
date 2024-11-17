package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationResponse {
    private String content;
    private Boolean isRead;
    private LocalDateTime createdAt;
}
