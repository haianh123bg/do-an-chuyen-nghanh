package com.haianh123bg.elearn_programming.controller.user;

import com.haianh123bg.elearn_programming.dto.request.UserInfoRequest;
import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.UserInfoResponse;
import com.haianh123bg.elearn_programming.service.UserService;
import com.haianh123bg.elearn_programming.validator.ValidPassword;
import com.haianh123bg.elearn_programming.validator.ValidPhoneNumber;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class AccountController {
    private final UserService userService;

    @ResponseStatus(HttpStatus.OK)
    @PutMapping("/change-password")
    public ApiResponse<Void> changePassword(
            @RequestParam("oldPassword") String oldPassword,
            @ValidPassword @RequestParam("newPassword") String newPassword,
            @ValidPassword @RequestParam("confirmPassword") String confirmPassword
            ) {
        userService.changePassword(oldPassword, newPassword, confirmPassword);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Bạn đã thay đổi mật khẩu thành công")
                .build();
    }

    @PreAuthorize("isAuthenticated()")
    @PostMapping("/avatar")
    public ApiResponse<String> changeAvatar(
            @NotNull(message = "Ảnh đại diện bắt buộc") @RequestPart(required = true) MultipartFile avatar
    ) {
        return ApiResponse.<String>builder()
                .message("Cập nhật ảnh đại diện thành công")
                .result(userService.changeAvatar(avatar))
                .build();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/info-p1")
    public ApiResponse<UserInfoResponse> changeUserInfoP1(
            @RequestBody UserInfoRequest request
            ){
        return ApiResponse.<UserInfoResponse>builder()
                .code(200)
                .result(userService.changeUserInfoP1(request))
                .build();
    }

    @PreAuthorize("isAuthenticated()")
    @PutMapping("/info-p2")
    public ApiResponse<String> changeUserInfoP2(
            @ValidPhoneNumber(message = "Phone invalid") @RequestParam String phone
    ){
        return ApiResponse.<String>builder()
                .code(200)
                .result(userService.changeUserInfoP2(phone))
                .build();
    }
}
