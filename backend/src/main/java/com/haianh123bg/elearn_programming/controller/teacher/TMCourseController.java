package com.haianh123bg.elearn_programming.controller.teacher;

import com.haianh123bg.elearn_programming.dto.request.CreateCourseRequest;
import com.haianh123bg.elearn_programming.dto.request.CreateItemRequest;
import com.haianh123bg.elearn_programming.dto.request.CreateModuleRequest;
import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.CourseResponse;
import com.haianh123bg.elearn_programming.dto.response.PageResponse;
import com.haianh123bg.elearn_programming.service.CourseService;
import com.haianh123bg.elearn_programming.utils.DateUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;


@Tag(name = "Giáo viên: quản lý khóa học", description = "Danh sách khóa học của giáo viên, tạo khóa học...")
@RestController
@RequestMapping("/teacher/courses")
@RequiredArgsConstructor
public class TMCourseController {
    private final CourseService courseService;

    @Operation(summary = "Danh sách khóa học")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
    })
    @PreAuthorize("isAuthenticated()")
    @GetMapping
    public ApiResponse<PageResponse<CourseResponse>> getPageCoursesByTeacher(
            @RequestParam(value = "page_no", required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(value = "page_size", required = false, defaultValue = "8") Integer pageSize,
            @RequestParam(value = "sort_by", required = false, defaultValue = "userId") String sortBy,
            @RequestParam(value = "sort_dir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "search_key", required = false, defaultValue = "") String searchKey,
            @RequestParam(value = "begin", required = false, defaultValue = "") String beginDate,
            @RequestParam(value = "end", required = false, defaultValue = "") String endDate
    ) {
        LocalDateTime begin = DateUtils.formatLocalDateTime(beginDate);
        LocalDateTime end = DateUtils.formatLocalDateTime(endDate);

        return ApiResponse.<PageResponse<CourseResponse>>builder()
                .code(200)
                .result(courseService.getPageCoursesByTeacher(pageNo, pageSize, sortBy, sortDir, searchKey, begin, end))
                .build();
    }

    @Operation(summary = "Tạo khóa học")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
    })
    @PreAuthorize("isAuthenticated()")
    @PostMapping
    public ApiResponse<Integer> createCourse(
            @RequestBody CreateCourseRequest request
    ) {
        return ApiResponse.<Integer>builder()
                .code(200)
                .message("Tạo khóa học thành công")
                .result(courseService.createCourse(request))
                .build();
    }

    @Operation(summary = "Tạo chương")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
    })
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/modules")
    public ApiResponse<Integer> createModule(
            @RequestBody CreateModuleRequest request,
            @RequestParam Integer courseId
    ) {
        return ApiResponse.<Integer>builder()
                .code(200)
                .message("Tạo chương thành công")
                .result(courseService.createModule(courseId, request))
                .build();
    }

    @Operation(summary = "Tạo bài học")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
    })
    @PreAuthorize("isAuthenticated()")
    @PostMapping("/items")
    public ApiResponse<Long> createItem(
            @RequestBody CreateItemRequest request,
            @RequestParam Integer moduleId
    ) {
        return ApiResponse.<Long>builder()
                .code(200)
                .message("Tạo chương thành công")
                .result(courseService.createItem(moduleId, request))
                .build();
    }
}
