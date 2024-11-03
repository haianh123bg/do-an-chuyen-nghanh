package com.haianh123bg.elearn_programming.utils;

import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class DateUtils {
    public static LocalDateTime formatLocalDateTime(String date) {
        LocalDateTime localDateTime = null;
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        if (date != null && !date.isEmpty()) {
            LocalDate localDate = LocalDate.parse(date, formatter);
            localDateTime = localDate.atStartOfDay();
            return localDateTime;
        }
        throw new AppException(ErrorCode.DATE_ERROR_FORMAT);
    }
}
