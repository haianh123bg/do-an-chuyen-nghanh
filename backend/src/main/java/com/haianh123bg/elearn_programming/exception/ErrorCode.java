package com.haianh123bg.elearn_programming.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@Getter
public enum ErrorCode {
    UNCATEGORIZED_EXCEPTION(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    UNAUTHENTICATED(1000, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1001, "You do not have permission", HttpStatus.FORBIDDEN),
    INVALID_CREDENTIALS(1002, "Invalid email or password!", HttpStatus.BAD_REQUEST),
    USER_NOT_EXISTED(1003, "Account does not exist", HttpStatus.NOT_FOUND),
    GOOGLE_AUTHENTICATION_FAIL(1004, "Google authentication failed", HttpStatus.INTERNAL_SERVER_ERROR),
    FACEBOOK_AUTHENTICATION_FAIL(1005, "Facebook authentication failed", HttpStatus.INTERNAL_SERVER_ERROR),
    CLOUD_FLARE_ERROR_UPLOAD(1006, "Cloud flare upload error!", HttpStatus.INTERNAL_SERVER_ERROR),
    USER_EXISTED(1007, "User already exists!", HttpStatus.BAD_REQUEST),
    AWS_UPLOAD_FILE_ERROR(1008, "AWS upload file error!", HttpStatus.INTERNAL_SERVER_ERROR),
    SEND_EMAIL_ERROR(1009, "Send email error!", HttpStatus.BAD_REQUEST),
    BAD_REQUEST(1010, "Bad request!", HttpStatus.BAD_REQUEST),
    VERIFY_CODE_INVALID(1011, "Verify code is invalid!", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1012, "Password is invalid!", HttpStatus.BAD_REQUEST),
    ACCESS_DENIED(1013, "You do not have access rights", HttpStatus.FORBIDDEN),
    INVALID_PASSWORD(1014, "Invalid email or password!", HttpStatus.BAD_REQUEST),
    POINT_TYPE_NOT_EXISTED(1015, "Point type does not exist", HttpStatus.BAD_REQUEST),
    USER_NOT_REGISTER_EMAIL(1016, "You have not registered an email for your account, please register an email", HttpStatus.BAD_REQUEST),
    NOT_REGISTER_AUTH_FA(1017, "You have not registered for two-factor authentication", HttpStatus.BAD_REQUEST),
    INVALID_USER_ID(1018, "Invalid userId", HttpStatus.BAD_REQUEST),
    CHAT_BOT_NOT_EXITS(1019, "Chatbot does not exist", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_EXITS(1020, "Product does not exist", HttpStatus.BAD_REQUEST),
    ACCOUNT_NOT_VERIFIED(1021, "Account is not verified", HttpStatus.BAD_REQUEST),
    INVALID_AUTH_FA_CODE(1022, "Authentication code is invalid", HttpStatus.BAD_REQUEST),
    CAPTCHA_INVALID(1023, "Recaptcha invalid", HttpStatus.BAD_REQUEST),
    REFRESH_TOKEN_INVALID(1024, "Refresh token invalid", HttpStatus.BAD_REQUEST),
    INVALID_TOKEN(1025, "Token invalid", HttpStatus.BAD_REQUEST),
    DATE_ERROR_FORMAT(1026, "Date error format", HttpStatus.BAD_REQUEST),
    COURSE_NOT_EXIST(1027, "Course does not exist", HttpStatus.BAD_REQUEST ),
    PASSWORD_MISMATCH(1028, "Passwords do not match", HttpStatus.BAD_REQUEST),
    CLOUD_FLARE_ERROR_DELETE(1029, "Cloudflare delete error!", HttpStatus.INTERNAL_SERVER_ERROR),
    FILE_NOT_EXISTS(1030, "File does not exist", HttpStatus.NOT_FOUND),
    CART_EMPTY(1031, "No courses in the cart", HttpStatus.BAD_REQUEST),
    COURSE_NOT_FOUND(1032, "Course not found", HttpStatus.NOT_FOUND),
    COURSE_NOT_IN_CART(1033, "There are no courses in your cart", HttpStatus.NOT_FOUND),
    ERROR_DELETE_CART(1034, "Failed to delete the course from the cart", HttpStatus.BAD_REQUEST),
    DISCOUNT_NOT_FOUND(1035, "Discount not found", HttpStatus.NOT_FOUND),
    EXPIRED_DISCOUNT(1036, "Discount code has expired", HttpStatus.BAD_REQUEST),
    DISCOUNT_OUT_OF_STOCK(1037, "Discount code is out of stock", HttpStatus.BAD_REQUEST),
    CATEGORY_NOT_FOUND(1038, "Category does not exist", HttpStatus.NOT_FOUND),
    TYPE_ITEM_INVALID(1039, "Type item invalid", HttpStatus.BAD_REQUEST),
    RESOURCE_NOT_FOUND(1040, "Resource not found", HttpStatus.BAD_REQUEST),
    ITEM_NOT_FOUND(1041, "Item not found", HttpStatus.NOT_FOUND),
    FILE_SIZE_EXCEEDED(1042, "File size exceeds the allowed limit", HttpStatus.BAD_REQUEST),
    INVALID_FILE_TYPE(1043, "Invalid file type", HttpStatus.BAD_REQUEST),;



    ErrorCode(int code, String message, HttpStatusCode status) {
        this.code = code;
        this.originalMessage = message;  // Lưu trữ message ban đầu
        this.message = message;
        this.statusCode = status;
    }

    private int code;
    private String message;
    private HttpStatusCode statusCode;
    private final String originalMessage; // Lưu trữ message gốc (ban đầu)

    // Phương thức để định dạng message và trả về ErrorCode
    public ErrorCode formatMessage(Object... args) {
        this.message = String.format(this.originalMessage, args);  // Luôn sử dụng message gốc để định dạng
        return this;
    }

    public String getFormattedMessage() {
        return this.message;
    }
}
