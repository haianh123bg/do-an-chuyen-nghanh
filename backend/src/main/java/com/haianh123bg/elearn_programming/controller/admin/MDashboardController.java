package com.haianh123bg.elearn_programming.controller.admin;

import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.MDashboardResponse;
import com.haianh123bg.elearn_programming.service.MDashboardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/m-dashboard")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MDashboardController {
    MDashboardService mDashboardService;

    @GetMapping("/overview")
    public ApiResponse<MDashboardResponse> overview() {

        return ApiResponse.<MDashboardResponse>builder()
                .code(200)
                .result(mDashboardService.overview())
                .build();
    }
}
