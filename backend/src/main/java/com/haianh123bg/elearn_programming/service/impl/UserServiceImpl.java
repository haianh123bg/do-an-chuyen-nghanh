package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.request.UserInfoRequest;
import com.haianh123bg.elearn_programming.dto.response.UserInfoResponse;
import com.haianh123bg.elearn_programming.entity.Bank;
import com.haianh123bg.elearn_programming.entity.User;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.mapper_mapstruct.UserMapperMapstruct;
import com.haianh123bg.elearn_programming.repository.UserRepository;
import com.haianh123bg.elearn_programming.service.UserService;
import com.haianh123bg.elearn_programming.service.other.CloudFlareR2Service;
import com.haianh123bg.elearn_programming.utils.GenderEnum;
import com.haianh123bg.elearn_programming.utils.PrefixFolderEnum;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CloudFlareR2Service cloudFlareR2Service;
    private final UserMapperMapstruct userMapperMapstruct;

    @Override
    public void changePassword(String oldPassword, String newPassword, String confirmPassword) {
        if (!Objects.equals(newPassword, confirmPassword)) {
            throw new AppException(ErrorCode.PASSWORD_MISMATCH);
        }

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());

        User user = userRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHORIZED)
        );

        if (passwordEncoder.matches(oldPassword, user.getPassword())) {
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
        }
    }

    @Override
    public String changeAvatar(MultipartFile avatar) {

        if (avatar != null && !avatar.isEmpty()) {
            String url = cloudFlareR2Service.saveFileWithPrefixFolder(PrefixFolderEnum.USER_AVATAR.getPrefix(), avatar);
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Integer userId = Integer.valueOf(authentication.getName());

            User user = userRepository.findById(userId).orElseThrow(
                    () -> new AppException(ErrorCode.UNAUTHORIZED)
            );
            user.setAvatar(url);
            userRepository.save(user);
        }
        throw new AppException(ErrorCode.UNCATEGORIZED_EXCEPTION);
    }

    @Override
    public UserInfoResponse changeUserInfoP1(UserInfoRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());

        User user = userRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHORIZED)
        );

        // Cập nhật các trường của user từ request
        user.setName(request.getName());
        user.setGender(request.getGender().name());
        user.setDateOfBirth(request.getDate());
        user.setAddress(request.getAddress());

        // Lưu user đã cập nhật vào database và trả về phản hồi
        return userMapperMapstruct.toUserInfoResponse(userRepository.save(user));
    }

    @Override
    public String changeUserInfoP2(String phone) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());

        User user = userRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHORIZED)
        );

        user.setPhoneNumber(phone);
        userRepository.save(user);
        return phone;
    }

    @Override
    public UserInfoResponse getUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Integer userId = Integer.valueOf(authentication.getName());

        User user = userRepository.findById(userId).orElseThrow(
                () -> new AppException(ErrorCode.UNAUTHORIZED)
        );

        Bank bank = user.getBank();
        if (bank == null) {
            bank = new Bank();
        }

        return UserInfoResponse.builder()
                .userId(user.getId())
                .name(user.getName())
                .phoneNumber(user.getPhoneNumber())
                .gender(GenderEnum.valueOf(user.getGender()))
                .date(user.getDateOfBirth())
                .address(user.getAddress())
                .bankName(bank.getBankName())
                .bankBranch(bank.getBankBranch())
                .accountNumber(bank.getAccountNumber())
                .accountName(bank.getAccountName())
                .build();
    }
}
