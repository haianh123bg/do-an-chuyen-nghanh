package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.request.UserInfoRequest;
import com.haianh123bg.elearn_programming.dto.response.UserInfoResponse;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {
    void changePassword(String oldPassword, String newPassword, String confirmPassword);

    String changeAvatar(MultipartFile avatar);

    UserInfoResponse changeUserInfoP1(UserInfoRequest request);

    String changeUserInfoP2(String phone);

    UserInfoResponse getUserInfo();
}
