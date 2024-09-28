package com.haianh123bg.elearn_programming.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class EmailValidator implements ConstraintValidator<ValidEmail, String> {

    // Định nghĩa regex cho email hợp lệ
    private static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";

    private static final Pattern pattern = Pattern.compile(EMAIL_PATTERN);

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
// Kiểm tra null hoặc chuỗi trống
        if (value == null || value.isEmpty()) {
            return false;
        }
        // Sử dụng regex để kiểm tra tính hợp lệ của email
        return pattern.matcher(value).matches();
    }
}
