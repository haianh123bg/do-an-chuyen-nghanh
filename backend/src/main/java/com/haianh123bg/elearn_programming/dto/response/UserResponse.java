package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserResponse {
    String name;
    String email;
    Long totalBuyer;
    Boolean isEnable;
}
