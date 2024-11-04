package com.haianh123bg.elearn_programming.controller.user;

import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.CourseResponse;
import com.haianh123bg.elearn_programming.dto.response.PageResponse;
import com.haianh123bg.elearn_programming.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @GetMapping("/page-courses")
    public ApiResponse<PageResponse<CourseResponse>> getPageCourses(
            @RequestParam(value = "page_no", required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(value = "page_size", required = false, defaultValue = "8") Integer pageSize,
            @RequestParam(value = "search_key", required = false, defaultValue = "") String searchKey
    ) {

        return ApiResponse.<PageResponse<CourseResponse>>builder()
                .code(200)
                .result(courseService.getPageCourses(pageNo, pageSize, searchKey))
                .build();
    }



}