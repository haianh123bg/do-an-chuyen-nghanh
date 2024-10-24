package com.haianh123bg.elearn_programming.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class RegisterFormRequest {
    private String name;
    private String email;
    private String password;
}