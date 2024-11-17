package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.request.CreateCourseRequest;
import com.haianh123bg.elearn_programming.dto.request.CreateItemRequest;
import com.haianh123bg.elearn_programming.dto.request.CreateModuleRequest;
import com.haianh123bg.elearn_programming.dto.response.CourseResponse;
import com.haianh123bg.elearn_programming.dto.response.CourseCategoryResponse;
import com.haianh123bg.elearn_programming.dto.response.LessionDetailsResponse;
import com.haianh123bg.elearn_programming.dto.response.PageResponse;

import java.time.LocalDateTime;

public interface CourseService {
    PageResponse<CourseResponse> getPageCourses(Integer pageNo, Integer pageSize, String searchKey);

    CourseCategoryResponse getCategoryOfCourse(Integer courseId);

    LessionDetailsResponse getLessionDetails(Integer courseId, Integer itemId);

    PageResponse<CourseResponse> getPageCoursesByTeacher(Integer pageNo, Integer pageSize, String sortBy, String sortDir, String searchKey, LocalDateTime beginLocalDateTime, LocalDateTime endLocalDateTime);

    Integer createCourse(CreateCourseRequest request);

    Integer createModule(Integer courseId, CreateModuleRequest request);

    Long createItem(Integer moduleId, CreateItemRequest request);
}
