package com.haianh123bg.elearn_programming.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CartsResponse {
    private List<CartResponse> courses;
    private Double totalRetailPrice;
    private Double totalDiscountedPrice;
}
