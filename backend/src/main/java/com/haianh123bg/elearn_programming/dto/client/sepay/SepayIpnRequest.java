package com.haianh123bg.elearn_programming.dto.client.sepay;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.math.BigDecimal;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class SepayIpnRequest {
    String gateway;               // BIDV
    String transactionDate;       // 2024-11-02 13:54:56
    String accountNumber;         // 8601886999
    String subAccount;            // 964516588REDAI38386
    String code;                  // null
    String content;               // DH32
    String transferType;          // in
    String description;           // BankAPINotify DH32
    Double transferAmount;    // 10000
    String referenceCode;         // 20241102000360
    Double accumulated;       // 0
    Long id;                      // 4205975
}
