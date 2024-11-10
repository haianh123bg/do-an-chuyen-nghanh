package com.haianh123bg.elearn_programming.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PaymentRequest {
    @NotEmpty(message = "Course must not null")
    private List<CourseRequest> course;

    private Integer discountId;

    @Setter
    @Getter
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CourseRequest {
        private Integer courseId;
    }
}
