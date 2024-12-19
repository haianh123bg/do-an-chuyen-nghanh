package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class MCourseResponse {
    Integer courseId;

    String name;

    String shortDescription;

    String detailDescription;

    LocalDateTime createdAt;

    LocalDateTime updatedAt;

    String createdByName;

    String updatedByName;

    String teacherName;

    String categoryName;

    String language;

    Double price;

    Double priceReal;

    Float averageRating;

    Integer totalBuyer;

    String imageUrl;

    Integer totalModules; // Thay đổi từ Long sang Integer

    Double totalRevenue;

    Boolean active;
}