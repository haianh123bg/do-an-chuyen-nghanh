package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;


@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class PaymentResponse {
    String qrCode;

    String bankCode;

    String bankName;

    String bankIcon;

    String accountNumber;

    String accountName;

    Double total;

    String description;
}
