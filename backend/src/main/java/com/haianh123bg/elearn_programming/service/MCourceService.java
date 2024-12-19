package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.response.MCourseResponse;
import com.haianh123bg.elearn_programming.dto.response.MOverviewCourceResponse;
import com.haianh123bg.elearn_programming.dto.response.PageResponse;

import java.time.LocalDateTime;

public interface MCourceService {
    MOverviewCourceResponse overviewCourse();

    PageResponse<MCourseResponse> pageCourse(Integer pageNo, Integer pageSize, String sortBy, String sortDir, String searchKey, LocalDateTime begin, LocalDateTime end);
}
