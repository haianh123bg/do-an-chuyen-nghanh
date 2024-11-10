package com.haianh123bg.elearn_programming.utils;

import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Setter
@Getter
@Component
public class SepayUtils {

    @Value("${sepay.bank-code}")
    private String bankCode;

    @Value("${sepay.bank-name}")
    private String bankName;

    @Value("${sepay.account-number}")
    private String accountNumber;

    @Value("${sepay.account-name}")
    private String accountName;

    @Value("${sepay.bank-icon}")
    private String bankIcon;

    public String qrCode(Integer orderId, String amount) {

        return String.format(
                "https://qr.sepay.vn/img?acc=%s&bank=%s&amount=%s&des=%s&template=%s&download=%s",
                accountNumber,
                bankCode,
                amount,
                "HD" + orderId,
                "compact",
                "true"
        );
    }


    public String getDescriptionPayment(Integer id) {
        return "HD" + id;
    }
}
