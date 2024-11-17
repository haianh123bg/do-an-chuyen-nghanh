package com.haianh123bg.elearn_programming.controller.user;

import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.CategoryResponse;
import com.haianh123bg.elearn_programming.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/categories")
@RequiredArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping
    public ApiResponse<List<CategoryResponse>> getCategories() {

        return ApiResponse.<List<CategoryResponse>>builder()
                .code(200)
                .result(categoryService.getAllCategoryes())
                .build();
    }
}
