package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.request.CreateNewPassword;
import com.haianh123bg.elearn_programming.dto.request.LoginFormRequest;
import com.haianh123bg.elearn_programming.dto.request.RegisterFormRequest;
import com.haianh123bg.elearn_programming.dto.response.LoginResponse;
import com.haianh123bg.elearn_programming.dto.response.TokenResponse;

public interface AuthenticationService {

    LoginResponse login(LoginFormRequest request);

    void register(RegisterFormRequest request);

    LoginResponse refreshToken(String refreshToken);

    void forgotPassword(String email);

    LoginResponse createNewPassword(CreateNewPassword request);

    TokenResponse verifyCode(String email, String code);

    LoginResponse loginWithGoogle(String code);
}
