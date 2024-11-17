package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.CategoryResponse;
import com.haianh123bg.elearn_programming.entity.Category;
import com.haianh123bg.elearn_programming.mapper.CategoryMapper;
import com.haianh123bg.elearn_programming.repository.CategoryRepository;
import com.haianh123bg.elearn_programming.service.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<CategoryResponse> getAllCategoryes() {
        List<Category> categories = categoryRepository.findAll();

        if (categories.isEmpty()) {
            return new ArrayList<>();
        }

        return categories.stream().map(
                CategoryMapper::categoryToCategoryResponse
        ).toList();
    }
}
