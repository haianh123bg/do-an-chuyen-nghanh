package com.haianh123bg.elearn_programming.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class AccountValidator implements ConstraintValidator<ValidAccount, String> {
    // Định nghĩa regex cho email hợp lệ
    private static final String EMAIL_PATTERN = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";

    // Regex để kiểm tra số điện thoại chỉ chứa 10 chữ số
    private static final String PHONE_NUMBER_PATTERN = "^\\d{10}$";

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        // Nếu chuỗi đầu vào là null hoặc rỗng, trả về false
        if (value == null || value.isEmpty()) {
            return false;
        }

        // Kiểm tra nếu chuỗi là email hợp lệ hoặc số điện thoại hợp lệ
        return value.matches(EMAIL_PATTERN) || value.matches(PHONE_NUMBER_PATTERN);
    }
}
