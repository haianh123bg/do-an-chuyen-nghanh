package com.haianh123bg.elearn_programming.controller.admin;

import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.MOverviewCourceResponse;
import com.haianh123bg.elearn_programming.service.MCourceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/m-course")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MCourceController {
    MCourceService mCourceService;

    @GetMapping("/overview")
    public ApiResponse<MOverviewCourceResponse> overviewCourse() {

        return ApiResponse.<MOverviewCourceResponse>builder()
                .code(200)
                .result(mCourceService.overviewCourse())
                .build();
    }


}
