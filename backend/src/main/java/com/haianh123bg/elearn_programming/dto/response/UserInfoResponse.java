package com.haianh123bg.elearn_programming.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.haianh123bg.elearn_programming.utils.GenderEnum;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UserInfoResponse {
    private Integer userId;
    private String name;
    private String phoneNumber;

    private GenderEnum gender;
    private LocalDate date;
    private String address;

    private String bankName;
    private String bankBranch;
    private String bankCode;
    private String accountNumber;
    private String accountName;
}
