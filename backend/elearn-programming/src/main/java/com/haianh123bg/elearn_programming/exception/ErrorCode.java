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
    INVALID_AUTH_FA_CODE(1022, "Authentication code is invalid", HttpStatus.BAD_REQUEST);

    ErrorCode(int code, String message, HttpStatusCode status) {
        this.code = code;
        this.message = message;
        this.statusCode = statusCode;
    }

    private int code;
    private String message;
    private HttpStatusCode statusCode;
}
