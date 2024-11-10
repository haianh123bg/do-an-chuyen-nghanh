package com.haianh123bg.elearn_programming.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CartResponse {
    private String courseImageUrl;
    private Integer courseId;
    private String courseName;
    private Double retailPrice;
    private Double discountedPrice;
}
