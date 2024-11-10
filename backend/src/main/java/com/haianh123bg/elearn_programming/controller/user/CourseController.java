package com.haianh123bg.elearn_programming.controller.user;

import com.haianh123bg.elearn_programming.dto.response.*;
import com.haianh123bg.elearn_programming.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/{id}/category-detail")
    public ApiResponse<CourseCategoryResponse> getCategoryOfCourse (
            @PathVariable(value = "id") Integer courseId
    ){

        return ApiResponse.<CourseCategoryResponse>builder()
                .code(200)
                .result(courseService.getCategoryOfCourse(courseId))
                .build();
    }

    @GetMapping("/{courseId}/{itemId}")
    public ApiResponse<LessionDetailsResponse> getLessionDetails(
            @PathVariable(value = "courseId") Integer courseId,
            @PathVariable(value = "itemId") Integer itemId
    ) {
        return ApiResponse.<LessionDetailsResponse>builder()
                .code(200)
                .result(courseService.getLessionDetails(courseId, itemId))
                .build();
    }

}