package com.haianh123bg.elearn_programming.validator;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

import java.util.regex.Pattern;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    // Biểu thức chính quy để kiểm tra có ít nhất một ký tự thường
    private static final String LOWERCASE_PATTERN = ".*[a-z].*";

    // Biểu thức chính quy để kiểm tra có ít nhất một ký tự in hoa
    private static final String UPPERCASE_PATTERN = ".*[A-Z].*";

    // Biểu thức chính quy để kiểm tra có ít nhất một chữ số
    private static final String DIGIT_PATTERN = ".*\\d.*";

    // Biểu thức chính quy để kiểm tra có ít nhất một ký tự đặc biệt (@, $, !, %, *, ?, &)
    private static final String SPECIAL_CHARACTER_PATTERN = ".*[@$!%*?&].*";

    // Độ dài tối thiểu của mật khẩu
    private static final int MIN_LENGTH = 8;

    // Độ dài tối đa của mật khẩu (có thể được kiểm tra nếu cần)
    private static final int MAX_LENGTH = 25;

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        // Kiểm tra nếu mật khẩu bị null hoặc trống
        if (password == null || password.isEmpty()) {
            // Nếu mật khẩu trống, gửi thông báo lỗi cụ thể và trả về false
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Mật khẩu không được để trống")
                    .addConstraintViolation();
            return false;
        }

        // Kiểm tra nếu mật khẩu có độ dài ít hơn yêu cầu tối thiểu
        if (password.length() < MIN_LENGTH) {
            // Nếu mật khẩu quá ngắn, gửi thông báo lỗi và trả về false
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Mật khẩu phải có ít nhất " + MIN_LENGTH + " ký tự")
                    .addConstraintViolation();
            return false;
        }

        // Kiểm tra nếu mật khẩu có độ dài ít hơn yêu cầu tối thiểu
        if (password.length() > MAX_LENGTH) {
            // Nếu mật khẩu quá dài, gửi thông báo lỗi và trả về false
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Mật khẩu tối đa " + MAX_LENGTH + " ký tự")
                    .addConstraintViolation();
            return false;
        }

        // Kiểm tra nếu mật khẩu không chứa ít nhất một ký tự thường
        if (!Pattern.matches(LOWERCASE_PATTERN, password)) {
            // Nếu không có ký tự thường, gửi thông báo lỗi và trả về false
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Mật khẩu phải chứa ít nhất một ký tự thường")
                    .addConstraintViolation();
            return false;
        }

        // Kiểm tra nếu mật khẩu không chứa ít nhất một ký tự in hoa
        if (!Pattern.matches(UPPERCASE_PATTERN, password)) {
            // Nếu không có ký tự in hoa, gửi thông báo lỗi và trả về false
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Mật khẩu phải chứa ít nhất một ký tự in hoa")
                    .addConstraintViolation();
            return false;
        }

        // Kiểm tra nếu mật khẩu không chứa ít nhất một chữ số
        if (!Pattern.matches(DIGIT_PATTERN, password)) {
            // Nếu không có chữ số, gửi thông báo lỗi và trả về false
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Mật khẩu phải chứa ít nhất một chữ số")
                    .addConstraintViolation();
            return false;
        }

        // Kiểm tra nếu mật khẩu không chứa ít nhất một ký tự đặc biệt
        if (!Pattern.matches(SPECIAL_CHARACTER_PATTERN, password)) {
            // Nếu không có ký tự đặc biệt, gửi thông báo lỗi và trả về false
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Mật khẩu phải chứa ít nhất một ký tự đặc biệt (@$!%*?&)")
                    .addConstraintViolation();
            return false;
        }

        // Nếu vượt qua tất cả các kiểm tra, mật khẩu được coi là hợp lệ
        return true;
    }
}
