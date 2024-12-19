package com.haianh123bg.elearn_programming.controller.admin;

import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.MCourseResponse;
import com.haianh123bg.elearn_programming.dto.response.MOverviewCourceResponse;
import com.haianh123bg.elearn_programming.dto.response.PageResponse;
import com.haianh123bg.elearn_programming.service.MCourceService;
import com.haianh123bg.elearn_programming.utils.DateUtils;
import io.swagger.v3.oas.annotations.Operation;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("/m-course")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MCourceController {
    MCourceService mCourceService;

    @Operation(summary = "Overview Khoá học", description = "Tổng quan khóa học ở ADMIN")
    @GetMapping("/overview")
    public ApiResponse<MOverviewCourceResponse> overviewCourse() {

        return ApiResponse.<MOverviewCourceResponse>builder()
                .code(200)
                .result(mCourceService.overviewCourse())
                .build();
    }

    @Operation(summary = "Danh sách khóa học có phân trang", description = "Danh sách khóa học có phân trang")
    @GetMapping("/page")
    public ApiResponse<PageResponse<MCourseResponse>> pageCourse(
            @RequestParam(value = "page_no", required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(value = "page_size", required = false, defaultValue = "8") Integer pageSize,
            @RequestParam(value = "sort_by", required = false, defaultValue = "courseId") String sortBy,
            @RequestParam(value = "sort_dir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "search_key", required = false, defaultValue = "") String searchKey,
            @RequestParam(value = "begin", required = false, defaultValue = "") String beginDate,
            @RequestParam(value = "end", required = false, defaultValue = "") String endDate
    ) {
        LocalDateTime begin = DateUtils.formatLocalDateTime(beginDate);
        LocalDateTime end = DateUtils.formatLocalDateTime(endDate);

        return ApiResponse.<PageResponse<MCourseResponse>>builder()
                .code(200)
                .result(mCourceService.pageCourse(pageNo, pageSize, sortBy, sortDir, searchKey, begin, end))
                .build();
    }
}
