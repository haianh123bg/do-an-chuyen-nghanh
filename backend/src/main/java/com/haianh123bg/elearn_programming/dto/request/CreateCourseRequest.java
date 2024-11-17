package com.haianh123bg.elearn_programming.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CreateCourseRequest {
    @NotEmpty
    private String courseName;

    @NotEmpty
    private String shortDescription;

    @NotEmpty
    private String detailDescription;

    private Integer categoryId;

    private String categoryName;
}
