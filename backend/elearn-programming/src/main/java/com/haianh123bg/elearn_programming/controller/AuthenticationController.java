package com.haianh123bg.elearn_programming.controller;

import com.haianh123bg.elearn_programming.dto.request.LoginFormRequest;
import com.haianh123bg.elearn_programming.dto.request.RegisterFormRequest;
import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.LoginResponse;
import com.haianh123bg.elearn_programming.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.models.annotations.OpenAPI30;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Bảo Mật", description = "Api này dùng để đăng nhập, đăng ký tài khoản")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Operation(summary = "đăng nhập")
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(
            @Valid @RequestBody LoginFormRequest request
            ) {
        return ApiResponse.<LoginResponse>builder()
                .code(200)
                .result(authenticationService.login(request))
                .build();
    }

    @Operation(summary = "đăng ký tài khoản")
    @PostMapping("/register")
    public ApiResponse<LoginResponse> register(
            @Valid @RequestBody RegisterFormRequest request
    ) {
        authenticationService.register(request);
        return ApiResponse.<LoginResponse>builder()
                .code(200)
                .message("Đăng ký thành công")
                .build();
    }
}
