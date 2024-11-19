package com.haianh123bg.elearn_programming.controller.user;

import com.haianh123bg.elearn_programming.dto.request.UserInfoRequest;
import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.UserInfoResponse;
import com.haianh123bg.elearn_programming.service.UserService;
import com.haianh123bg.elearn_programming.validator.ValidPassword;
import com.haianh123bg.elearn_programming.validator.ValidPhoneNumber;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class AccountController {
    private final UserService userService;

    @Operation(summary = "Đổi mật khẩu người dùng", description = "Đổi mật khẩu người dùng")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1028", description = "Passwords do not match", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1002", description = "Invalid email or password!", content = @Content),

        })
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

    @Operation(summary = "Đổi ảnh đại diện", description = "Thay đổi ảnh đại diện")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "9999", description = "Uncategorized error", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1002", description = "Invalid email or password!", content = @Content),

 
    })
    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/avatar", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<String> changeAvatar(
            @NotNull(message = "Ảnh đại diện bắt buộc") @RequestPart(required = true) MultipartFile avatar
    ) {
        return ApiResponse.<String>builder()
                .message("Cập nhật ảnh đại diện thành công")
                .result(userService.changeAvatar(avatar))
                .build();
    }

    @Operation(summary = "Lấy thông tin người dùng", description = "Lấy thông tin người dùng")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1003", description = "Account does not exist", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1002", description = "Invalid email or password!", content = @Content),


    })
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/info")
    public ApiResponse<UserInfoResponse> getUserInfo() {
        return ApiResponse.<UserInfoResponse>builder()
                .code(200)
                .result(userService.getUserInfo())
                .build();
    }

    @Operation(summary = "Thay đổi thông tin người dùng P1")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1003", description = "Account does not exist", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1002", description = "Invalid email or password!", content = @Content),


            })
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/info-p1")
    public ApiResponse<UserInfoResponse> changeUserInfoP1(
            @RequestBody UserInfoRequest request
    ) {
        return ApiResponse.<UserInfoResponse>builder()
                .code(200)
                .result(userService.changeUserInfoP1(request))
                .build();
    }

    @Operation(summary = "Thay đổi thông tin người dùng P2")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
             @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
             @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1003", description = "Account does not exist", content = @Content),
             @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1002", description = "Invalid email or password!", content = @Content),


    })
    @PreAuthorize("isAuthenticated()")
    @PutMapping("/info-p2")
    public ApiResponse<String> changeUserInfoP2(
            @ValidPhoneNumber(message = "Phone invalid") @RequestParam String phone
    ) {
        return ApiResponse.<String>builder()
                .code(200)
                .result(userService.changeUserInfoP2(phone))
                .build();
    }
}
