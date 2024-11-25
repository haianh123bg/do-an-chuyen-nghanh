package com.haianh123bg.elearn_programming.controller.user;

import com.haianh123bg.elearn_programming.dto.response.*;
import com.haianh123bg.elearn_programming.service.CourseService;
import com.haianh123bg.elearn_programming.utils.DateUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/courses")
@RequiredArgsConstructor
public class CourseController {
    private final CourseService courseService;

    @Operation(summary = "Phân trang danh sách khóa học", description = "Phân trang danh sách khóa học")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1027", description = "Course does not exist", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
    })
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

    @Operation(summary = "Lấy ra chi tiết danh mục của một khóa học", description = "Lấy ra chi tiết danh mục của một khóa học")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1027", description = "Course does not exist", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),

    })
    @GetMapping("/{id}/category-detail")
    public ApiResponse<CourseCategoryResponse> getCategoryOfCourse(
            @PathVariable(value = "id") Integer courseId
    ) {

        return ApiResponse.<CourseCategoryResponse>builder()
                .code(200)
                .result(courseService.getCategoryOfCourse(courseId))
                .build();
    }

    @Operation(summary = "Lấy ra chi tiết bài học", description = "Lấy ra chi tiết nội dung của một bài học")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1041", description = "Item not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1027", description = "Course does not exist", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),


    })
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

    @Operation(summary = "Lấy ra khóa học bằng danh mục", description = "Lấy ra các danh sách khóa học dựa vào danh mục")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1027", description = "Course does not exist", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
    })

    @GetMapping("/categories/{category_id}")
    public ApiResponse<PageResponse<CourseResponse>> getCourseByCategory(
            @PathVariable(value = "category_id") Integer categoryId,
            @RequestParam(value = "page_no", required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(value = "page_size", required = false, defaultValue = "8") Integer pageSize,
            @RequestParam(value = "sort_by", required = false, defaultValue = "total") String sortBy,
            @RequestParam(value = "sort_dir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "search_key", required = false, defaultValue = "") String searchKey,
            @RequestParam(value = "begin", required = false, defaultValue = "") String beginDate,
            @RequestParam(value = "end", required = false, defaultValue = "") String endDate
    ) {
        LocalDateTime begin = DateUtils.formatLocalDateTime(beginDate);
        LocalDateTime end = DateUtils.formatLocalDateTime(endDate);
        return ApiResponse.<PageResponse<CourseResponse>>builder()
                .code(200)
                .result(courseService.findCoursesByCategoryId(categoryId, pageNo, pageSize, sortBy, sortDir, searchKey, begin, end))
                .build();
    }

    @Operation(summary = "Phân trang danh sách khóa học", description = "Phân trang danh sách khóa học")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
    })
    @PreAuthorize("isAuthenticated()")
    @GetMapping("/page-course/user")
    public ApiResponse<PageResponse<CourseResponse>> getCourseOfUser(
            @RequestParam(value = "page_no", required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(value = "page_size", required = false, defaultValue = "8") Integer pageSize,
            @RequestParam(value = "search_key", required = false, defaultValue = "") String searchKey
    ) {

        return ApiResponse.<PageResponse<CourseResponse>>builder()
                .code(200)
                .result(courseService.getCourseOfUser(pageNo, pageSize, searchKey))
                .build();
    }
}