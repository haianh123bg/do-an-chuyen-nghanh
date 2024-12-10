package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MDashboardResponse {
    Long totalStudent;
    Long totalCourse;
    Long totalTeacher;
    Double adsense;
    Double totalRevenue;
    Long totalBlog;
}