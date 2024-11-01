package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.client.google.RecaptchaV2;
import com.haianh123bg.elearn_programming.dto.request.LoginFormRequest;
import com.haianh123bg.elearn_programming.dto.request.RegisterFormRequest;
import com.haianh123bg.elearn_programming.dto.response.LoginResponse;
import com.haianh123bg.elearn_programming.entity.Role;
import com.haianh123bg.elearn_programming.entity.User2faSetting;
import com.haianh123bg.elearn_programming.repository.RoleRepository;
import com.haianh123bg.elearn_programming.entity.User;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.repository.User2faSettingRepository;
import com.haianh123bg.elearn_programming.repository.UserRepository;
import com.haianh123bg.elearn_programming.repository.client.google.RecaptchaV2Client;
import com.haianh123bg.elearn_programming.service.AuthenticationService;
import com.haianh123bg.elearn_programming.service.JWTService;
import com.haianh123bg.elearn_programming.utils.RoleUtils;
import com.haianh123bg.elearn_programming.utils.UserUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RecaptchaV2Client recaptchaClient;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final RoleUtils roleUtils;
    private final User2faSettingRepository user2faSettingRepository;

    @Value("${jwt.access-token}")
    private Integer timeAccessToken;
    private final RoleRepository roleRepository;

    @Value("${google.recaptcha.v2.secret}")
    private String recaptchaSecret;


    @Override
    public LoginResponse login(LoginFormRequest request) {
//        RecaptchaV2 recaptchaV2 = recaptchaClient.verifyRecaptcha(recaptchaSecret, request.getCaptchaToken(), null);
//
//        if (!recaptchaV2.isSuccess()) {
//            throw new AppException(ErrorCode.CAPTCHA_INVALID);
//        }

        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );

        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            if (user.getIsEnable()) {
                String accessToken = jwtService.generateToken(user);
                String refreshToken = jwtService.generateToken(user);

                // Tính thời gian hết hạn cho access token
                LocalDateTime expiresAt = LocalDateTime.now().plusHours(timeAccessToken - 1);

                return LoginResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(refreshToken)
                        .roles(UserUtils.getRoles(user.getRoles()))
                        .userId(user.getId())
                        .expires(expiresAt)
                        .build();
            }
        }
        throw new AppException(ErrorCode.USER_NOT_EXISTED);
    }

    @Transactional
    @Override
    public void register(RegisterFormRequest request) {
//        RecaptchaV2 recaptchaV2 = recaptchaClient.verifyRecaptcha(recaptchaSecret, request.getCaptchaToken(), null);
//
//        if (!recaptchaV2.isSuccess()) {
//            throw new AppException(ErrorCode.CAPTCHA_INVALID);
//        }

        User user = userRepository.findByEmail(request.getEmail()).orElse(null);
        if (user != null) {
            throw new AppException(ErrorCode.USER_EXISTED);
        }

        // Thêm role
        List<Role> roles = roleUtils.createBasicRole();

        User newUser = User.builder()
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .isEnable(true)
                .isVerify(true)
                .roles(roles)
                .createdAt(LocalDateTime.now())
                .build();

        User userCreated = userRepository.save(newUser);

        User2faSetting user2faSetting = User2faSetting.builder()
                .user(userCreated)
                .googleAuthenticatorEnabled(false)
                .otpEmailEnabled(false)
                .otpSmsEnabled(false)
                .build();
        user2faSettingRepository.save(user2faSetting);
    }
}
