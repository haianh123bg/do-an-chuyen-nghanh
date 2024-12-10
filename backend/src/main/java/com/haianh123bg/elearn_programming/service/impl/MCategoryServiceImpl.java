package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.MOverviewCategoryResponse;
import com.haianh123bg.elearn_programming.repository.CategoryRepository;
import com.haianh123bg.elearn_programming.service.MCategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MCategoryServiceImpl implements MCategoryService {
    CategoryRepository categoryRepository;


    @Override
    public MOverviewCategoryResponse overviewCategory() {

        return MOverviewCategoryResponse.builder()
                .totalCategory(categoryRepository.count())
                .build();
    }
}
