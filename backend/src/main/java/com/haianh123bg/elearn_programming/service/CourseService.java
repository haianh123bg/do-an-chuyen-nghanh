package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.response.CourseResponse;
import com.haianh123bg.elearn_programming.dto.response.CourseCategoryResponse;
import com.haianh123bg.elearn_programming.dto.response.LessionDetailsResponse;
import com.haianh123bg.elearn_programming.dto.response.PageResponse;

public interface CourseService {
    PageResponse<CourseResponse> getPageCourses(Integer pageNo, Integer pageSize, String searchKey);

    CourseCategoryResponse getCategoryOfCourse(Integer courseId);

    LessionDetailsResponse getLessionDetails(Integer courseId, Integer itemId);
}
