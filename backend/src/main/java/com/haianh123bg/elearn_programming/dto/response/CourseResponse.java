package com.haianh123bg.elearn_programming.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseResponse {
    private Integer courseId;
    private String courseName;
    private Double amount;
    private Double total;
    private Float star;
    private String imageUrl;
}
