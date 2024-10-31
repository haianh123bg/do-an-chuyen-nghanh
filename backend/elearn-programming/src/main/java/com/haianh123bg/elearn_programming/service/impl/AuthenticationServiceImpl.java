package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.request.LoginFormRequest;
import com.haianh123bg.elearn_programming.dto.response.LoginResponse;
import com.haianh123bg.elearn_programming.service.AuthenticationService;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Override
    public LoginResponse login(LoginFormRequest request) {

        return new LoginResponse();
    }

    @Override
    public Void register() {
        return null;
    }
}
