package com.haianh123bg.elearn_programming.dto.request;

import com.haianh123bg.elearn_programming.validator.ValidEmail;
import com.haianh123bg.elearn_programming.validator.ValidPassword;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterFormRequest {
    @NotEmpty
    private String name;

    @ValidEmail
    private String email;

    @ValidPassword
    private String password;

    //@NotEmpty
    private String captchaToken;
}
