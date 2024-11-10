package com.haianh123bg.elearn_programming.controller.admin;

import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.PageResponse;
import com.haianh123bg.elearn_programming.dto.response.UserResponse;
import com.haianh123bg.elearn_programming.service.MAccountService;
import com.haianh123bg.elearn_programming.utils.DateUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@RestController
@RequestMapping("/m-account")
@RequiredArgsConstructor
public class MAccountController {
    private final MAccountService mAccountService;

    @GetMapping("/page-user")
    public ApiResponse<PageResponse<UserResponse>> pageUser(
            @RequestParam(value = "page_no", required = false, defaultValue = "1") Integer pageNo,
            @RequestParam(value = "page_size", required = false, defaultValue = "8") Integer pageSize,
            @RequestParam(value = "sort_by", required = false, defaultValue = "userId") String sortBy,
            @RequestParam(value = "sort_dir", required = false, defaultValue = "desc") String sortDir,
            @RequestParam(value = "search_key", required = false, defaultValue = "") String searchKey,
            @RequestParam(value = "begin", required = false, defaultValue = "") String begin,
            @RequestParam(value = "end", required = false, defaultValue = "") String end
    ) {
        LocalDateTime beginTime = DateUtils.formatLocalDateTime(begin);
        LocalDateTime endTime = DateUtils.formatLocalDateTime(end);

        return ApiResponse.<PageResponse<UserResponse>>builder()
                .code(200)
                .result(mAccountService.getPageUser(pageNo, pageSize, sortBy, sortDir, searchKey, beginTime, endTime))
                .build();
    }
}