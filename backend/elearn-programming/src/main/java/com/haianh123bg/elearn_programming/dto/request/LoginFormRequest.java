package com.haianh123bg.elearn_programming.dto.request;

import com.haianh123bg.elearn_programming.validator.ValidEmail;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class LoginFormRequest {

    @ValidEmail(message = "Email sai định dạng")
    private String email;

    private String password;

    @NotBlank
    private String captchaToken;
}
