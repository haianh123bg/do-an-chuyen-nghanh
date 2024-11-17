package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponse {
    private Integer courseId;
    private String courseName;
    private Double amount;
    private Double total;
    private Float star;
    private String imageUrl;

    private Long totalBuyer;
    private Double totalRevenue;
    private Boolean active;
}
