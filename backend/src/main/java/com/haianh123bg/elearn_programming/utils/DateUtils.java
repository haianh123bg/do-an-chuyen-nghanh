package com.haianh123bg.elearn_programming.utils;

import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

public class DateUtils {
    private static final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    public static LocalDateTime formatLocalDateTime(String date) {
        if (date == null || date.isBlank()) {
            return null;
        }

        try {
            LocalDate localDate = LocalDate.parse(date, FORMATTER);
            return localDate.atStartOfDay();
        } catch (DateTimeParseException e) {
            throw new AppException(ErrorCode.DATE_ERROR_FORMAT);
        }
    }
}
