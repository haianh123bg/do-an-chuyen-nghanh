package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CourseCategoryResponse {
    List<ModuleResponse> modules;
    String courseName;
    Integer courseId;
}
