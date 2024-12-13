package com.haianh123bg.elearn_programming.mapper;

import com.haianh123bg.elearn_programming.dto.request.FormChangeBank;
import com.haianh123bg.elearn_programming.entity.Bank;
import com.haianh123bg.elearn_programming.entity.User;

public class BankMapper {
    public static Bank toBank(FormChangeBank request, User user) {
        return Bank.builder()
                .bankBranch(request.getBankBranch())
                .bankCode(request.getBankCode())
                .bankName(request.getBankName())
                .accountName(request.getAccountName())
                .accountNumber(request.getAccountNumber())
                .user(user)
                .build();
    }
}
