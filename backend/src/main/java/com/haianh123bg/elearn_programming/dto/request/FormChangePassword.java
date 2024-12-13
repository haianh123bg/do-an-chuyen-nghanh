package com.haianh123bg.elearn_programming.dto.request;

import com.haianh123bg.elearn_programming.validator.ValidPassword;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class FormChangePassword {
    String oldPassword;

    @ValidPassword
    String newPassword;

    @ValidPassword
    String confirmPassword;
}
