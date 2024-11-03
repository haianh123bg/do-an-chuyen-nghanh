package com.haianh123bg.elearn_programming.dto.request;

import com.haianh123bg.elearn_programming.validator.ValidPassword;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateNewPassword {
    @ValidPassword
    private String password;

    @ValidPassword
    private String confirmPassword;

    @NotEmpty
    private String token;
}
