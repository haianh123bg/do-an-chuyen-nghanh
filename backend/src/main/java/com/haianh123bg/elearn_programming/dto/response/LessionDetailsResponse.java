package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Setter
@Getter
@SuperBuilder
@AllArgsConstructor
@NoArgsConstructor
public abstract class LessionDetailsResponse {
    Long itemId;
    String title;
    String description;
    LocalDateTime createdAt;
    LocalDateTime updatedAt;
    String type;
}
