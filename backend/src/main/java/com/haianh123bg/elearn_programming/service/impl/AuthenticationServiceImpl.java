package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.request.CreateNewPassword;
import com.haianh123bg.elearn_programming.dto.request.LoginFormRequest;
import com.haianh123bg.elearn_programming.dto.request.RegisterFormRequest;
import com.haianh123bg.elearn_programming.dto.response.LoginResponse;
import com.haianh123bg.elearn_programming.dto.response.TokenResponse;
import com.haianh123bg.elearn_programming.entity.Role;
import com.haianh123bg.elearn_programming.entity.User2faSetting;
import com.haianh123bg.elearn_programming.entity.User;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.repository.User2faSettingRepository;
import com.haianh123bg.elearn_programming.repository.UserRepository;
import com.haianh123bg.elearn_programming.repository.client.google.RecaptchaV2Client;
import com.haianh123bg.elearn_programming.service.AuthenticationService;
import com.haianh123bg.elearn_programming.service.JWTService;
import com.haianh123bg.elearn_programming.service.RedisService;
import com.haianh123bg.elearn_programming.service.other.EmailService;
import com.haianh123bg.elearn_programming.utils.*;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final RecaptchaV2Client recaptchaClient;
    private final JWTService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final RoleUtils roleUtils;
    private final User2faSettingRepository user2faSettingRepository;
    private final RedisService redisService;
    private final EmailService emailService;

    @Value("${jwt.access-token}")
    private Integer timeAccessToken;

    @Value("${google.recaptcha.v2.secret}")
    private String recaptchaSecret;

    @Value("${jwt.reset-password-token}")
    private int timeResetPasswordToken;


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

    @Override
    public LoginResponse refreshToken(String refreshToken) {

        Claims claims = jwtService.parseToken(refreshToken);
        final String email = claims.getSubject();
        final String typeToken = claims.get("type", String.class);

        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );

        if (
                typeToken == null
                        ||
                        typeToken.isEmpty()
                        ||
                        !typeToken.equals(TypeTokenEnum.REFRESH.name())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        if (!jwtService.isValid(refreshToken, user)) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }


        if (user.getIsEnable()) {
            String accessToken = jwtService.generateToken(user);
            String newRefreshToken = jwtService.generateRefreshToken(user);

            LocalDateTime expiresAt = LocalDateTime.now().plusHours(timeAccessToken - 1);

            return LoginResponse.builder()
                    .accessToken(accessToken)
                    .refreshToken(newRefreshToken)
                    .roles(UserUtils.getRoles(user.getRoles()))
                    .userId(user.getId())
                    .expires(expiresAt)
                    .build();
        }
        throw new AppException(ErrorCode.USER_NOT_EXISTED);
    }

    @Override
    public void forgotPassword(String email) {
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );

        String code = GenericCode.generateCodeWithNumbersOnly(6);

        String key = PrefixKeyRedisEnum.RESET_PASSWORD_.name() + user.getEmail();
        redisService.saveDataWithTTL(key, code, 5, TimeUnit.MINUTES);

        // Gửi email cho người dùng
        emailService.sendSimpleMail(user.getEmail(), "Request Reset Password", code);
    }

    @Override
    public LoginResponse createNewPassword(CreateNewPassword request) {
        try {
            Claims claims = jwtService.parseToken(request.getToken());
            String email = claims.getSubject();
            String typeToken = claims.get("type", String.class);

            User user = userRepository.findByEmail(email).orElseThrow(
                    () -> new AppException(ErrorCode.USER_NOT_EXISTED)
            );

            // Kiểm tra điều kiện
            if (
                    !jwtService.isValid(request.getToken(), user)
                    ||
                    !typeToken.equals(TypeTokenEnum.PASSWORD_RESET.name())) {
                throw new AppException(ErrorCode.UNAUTHENTICATED);
            }

            // Nếu hợp lệ
            user.setPassword(passwordEncoder.encode(request.getPassword()));
            userRepository.save(user);
            if (user.getIsEnable()) {
                String accessToken = jwtService.generateToken(user);
                String newRefreshToken = jwtService.generateRefreshToken(user);

                LocalDateTime expiresAt = LocalDateTime.now().plusHours(timeAccessToken - 1);

                return LoginResponse.builder()
                        .accessToken(accessToken)
                        .refreshToken(newRefreshToken)
                        .roles(UserUtils.getRoles(user.getRoles()))
                        .userId(user.getId())
                        .expires(expiresAt)
                        .build();
            }
        } catch (Exception e) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        throw new AppException(ErrorCode.UNAUTHENTICATED);
    }

    @Override
    public TokenResponse verifyCode(String email, String code) {

        String key = PrefixKeyRedisEnum.RESET_PASSWORD_.name() + email;
        Object cacheCode = redisService.getData(key);

        // Kiểm tra mã từ Redis
        if (cacheCode == null || !cacheCode.equals(code)) {
            log.error("Verification code is invalid or expired for email: {}", email);
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        // Lấy thông tin user
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new AppException(ErrorCode.USER_NOT_EXISTED)
        );

        // Tạo token đặt lại mật khẩu
        String token = jwtService.generateResetPasswordToken(user);

        return TokenResponse.builder()
                .token(token)
                .expires(LocalDateTime.now().plusMinutes(timeResetPasswordToken))
                .build();
    }
}
