package com.haianh123bg.elearn_programming.controller.auth;

import com.haianh123bg.elearn_programming.dto.request.CreateNewPassword;
import com.haianh123bg.elearn_programming.dto.request.LoginFormRequest;
import com.haianh123bg.elearn_programming.dto.request.RegisterFormRequest;
import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.LoginResponse;
import com.haianh123bg.elearn_programming.dto.response.TokenResponse;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.service.AuthenticationService;
import com.haianh123bg.elearn_programming.validator.ValidEmail;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
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
            @Valid @RequestBody LoginFormRequest request,
            HttpServletResponse response
    ) {
        LoginResponse loginResponse = authenticationService.login(request);

        Cookie refreshTokenCookie = new Cookie("refreshToken", loginResponse.getRefreshToken());
        refreshTokenCookie.setHttpOnly(true);
        //refreshTokenCookie.setSecure(true); // Chỉ dùng cho HTTPS
        refreshTokenCookie.setPath("/auth/refresh-token"); // Chỉ gửi tới đường dẫn này
        refreshTokenCookie.setMaxAge(timeHoursRefresh);

        response.addCookie(refreshTokenCookie);

        loginResponse.setRefreshToken(null);

        return ApiResponse.<LoginResponse>builder()
                .code(200)
                .result(loginResponse)
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

    @Operation(summary = "lấy refresh token đổi lấy access token")
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

    @Operation(summary = "gửi yêu cầu quên mật khẩu")
    @PostMapping("/forgot-password")
    public ApiResponse<Void> forgotPassword(
            @RequestParam String email
    ) {
        authenticationService.forgotPassword(email);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Đã gửi yêu cầu đổi mật khẩu vào email của bạn")
                .build();
    }

    @Operation(summary = "xác minh mã code xác thực đổi mật khẩu")
    @PostMapping("/verify-code")
    public ApiResponse<TokenResponse> verifyCode(
            @ValidEmail @RequestParam String email,
            @NotEmpty @RequestParam String code
    ) {

        return ApiResponse.<TokenResponse>builder()
                .code(200)
                .message("true")
                .result(authenticationService.verifyCode(email, code))
                .build();
    }

    @Operation(summary = "reset mật khẩu mới sau khi xác thực code")
    @PostMapping("/create-new-password")
    public ApiResponse<LoginResponse> createNewPassword(
            @Valid @RequestBody CreateNewPassword request
    ) {
        // Kiểm tra password có trùng không
        boolean equalPassword = request.getPassword().equals(request.getConfirmPassword());
        if (!equalPassword) {
            throw new AppException(ErrorCode.PASSWORD_INVALID);
        }

        return ApiResponse.<LoginResponse>builder()
                .code(200)
                .result(authenticationService.createNewPassword(request))
                .build();
    }
}
