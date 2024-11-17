package com.haianh123bg.elearn_programming.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;


@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CategoryResponse {
    private Integer id;

    private String name;

    private String description;

    private Integer totalCourse;
}
