package com.haianh123bg.elearn_programming.controller;

import com.haianh123bg.elearn_programming.dto.request.LoginFormRequest;
import com.haianh123bg.elearn_programming.dto.request.RegisterFormRequest;
import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.LoginResponse;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.service.AuthenticationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Bảo Mật", description = "Api này dùng để đăng nhập, đăng ký tài khoản")
@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    @Value("${jwt.refresh-token}")
    private Integer timeHoursRefresh;

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

    @PostMapping("/refresh-token")
    public ApiResponse<LoginResponse> refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    ) {
        // Lấy cookie refresh token từ request
        String refreshToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("refreshToken".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        // Kiểm tra refresh token có tồn tại không
        if (refreshToken == null) {
            throw new AppException(ErrorCode.REFRESH_TOKEN_INVALID);
        }

        // Làm mới token
        LoginResponse loginResponse = authenticationService.refreshToken(refreshToken);

        // Cập nhật cookie với thông tin mới
        Cookie newRefreshTokenCookie = new Cookie("refreshToken", loginResponse.getRefreshToken());
        newRefreshTokenCookie.setHttpOnly(true);
        // newRefreshTokenCookie.setSecure(true); // Dùng khi triển khai HTTPS
        newRefreshTokenCookie.setPath("/auth/refresh-token");
        newRefreshTokenCookie.setMaxAge(timeHoursRefresh);
        response.addCookie(newRefreshTokenCookie);

        // Trả về kết quả
        loginResponse.setRefreshToken(null);

        return ApiResponse.<LoginResponse>builder()
                .code(200)
                .result(loginResponse)
                .build();
    }
}
