package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.request.LoginFormRequest;
import com.haianh123bg.elearn_programming.dto.response.LoginResponse;

public interface AuthenticationService {

    LoginResponse login(LoginFormRequest request);

    Void register();
}
