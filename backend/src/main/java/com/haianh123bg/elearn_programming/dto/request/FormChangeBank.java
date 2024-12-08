package com.haianh123bg.elearn_programming.dto.request;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FormChangeBank {
    String bankCode;
    String bankBranch;
    String accountNumber;
    String accountName;
    String bankName;
}
