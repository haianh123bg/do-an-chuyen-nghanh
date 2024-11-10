package com.haianh123bg.elearn_programming.utils;

import com.haianh123bg.elearn_programming.entity.Discount;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;

import java.time.LocalDateTime;

public class DiscountUtils {
    public static Boolean isValidDiscount(Discount discount, Double total) {
        if (discount.getExpiredDate().isAfter(LocalDateTime.now())) {
            throw new AppException(ErrorCode.EXPIRED_DISCOUNT);
        }

        if (discount.getLowerLimit() > total) {
            throw new AppException(ErrorCode.DISCOUNT_OUT_OF_STOCK);
        }

        if (discount.getQuantity() <= 0) {
            throw new AppException(ErrorCode.EXPIRED_DISCOUNT);
        }
        return true;
    }
}
