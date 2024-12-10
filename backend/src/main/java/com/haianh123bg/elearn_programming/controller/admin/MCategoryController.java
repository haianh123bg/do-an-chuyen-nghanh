package com.haianh123bg.elearn_programming.controller.admin;

import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.MOverviewCategoryResponse;
import com.haianh123bg.elearn_programming.service.MCategoryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/m-category")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MCategoryController {
    MCategoryService mCategoryService;

    @GetMapping("/overview")
    public ApiResponse<MOverviewCategoryResponse> overviewCategory() {

        return ApiResponse.<MOverviewCategoryResponse>builder()
                .code(200)
                .result(mCategoryService.overviewCategory())
                .build();
    }

}
