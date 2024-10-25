package com.haianh123bg.elearn_programming.utils;

public enum TypeTokenEnum {
    TRANSACTION,   // Token cho giao dịch
    ACCESS,        // Token cho hoạt động truy cập hệ thống (login)
    REFRESH,       // Token để làm mới Access Token
    PASSWORD_RESET, // Token để đặt lại mật khẩu (nếu cần thêm)
    UPDATE_INFO
}
