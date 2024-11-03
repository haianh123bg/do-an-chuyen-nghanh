package com.haianh123bg.elearn_programming.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PhoneNumberValidator implements ConstraintValidator<ValidPhoneNumber, String> {
    // Regex để kiểm tra số điện thoại chỉ chứa 10 chữ số
    private static final String PHONE_NUMBER_PATTERN = "^\\d{10}$";

    private static final Pattern pattern = Pattern.compile(PHONE_NUMBER_PATTERN);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Kiểm tra null hoặc chuỗi trống
        if (value == null || value.isEmpty()) {
            return false;
        }

        // Sử dụng regex để kiểm tra tính hợp lệ của số điện thoại
        return pattern.matcher(value).matches();
    }
}
