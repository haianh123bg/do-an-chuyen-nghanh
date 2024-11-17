package com.haianh123bg.elearn_programming.mapper;

import com.haianh123bg.elearn_programming.dto.response.CategoryResponse;
import com.haianh123bg.elearn_programming.entity.Category;

public class CategoryMapper {
    public static CategoryResponse categoryToCategoryResponse(Category category) {

        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .totalCourse(category.getTotalCourse())
                .build();
    }
}
