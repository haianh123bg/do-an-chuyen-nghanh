package com.haianh123bg.elearn_programming.dto.response;

import com.haianh123bg.elearn_programming.utils.GenderEnum;
import lombok.*;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserInfoResponse {
    private String name;
    private GenderEnum gender;
    private Date date;
    private String adddress;
}
