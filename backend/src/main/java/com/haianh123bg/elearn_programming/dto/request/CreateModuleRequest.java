package com.haianh123bg.elearn_programming.dto.request;

import lombok.*;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateModuleRequest {
    private String name;
    private String description;
    private Integer order;
}
