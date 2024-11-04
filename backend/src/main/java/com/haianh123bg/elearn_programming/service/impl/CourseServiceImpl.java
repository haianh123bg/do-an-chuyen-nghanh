package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.CourseResponse;
import com.haianh123bg.elearn_programming.dto.response.PageResponse;
import com.haianh123bg.elearn_programming.entity.Course;
import com.haianh123bg.elearn_programming.repository.CourseRepository;
import com.haianh123bg.elearn_programming.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CourseServiceImpl implements CourseService {
    private final CourseRepository courseRepository;

    @Override
    public PageResponse<CourseResponse> getPageCourses(
            Integer pageNo,
            Integer pageSize,
            String searchKey
    ) {
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize);

        Page<Course> page = courseRepository.findPageCourse(searchKey, pageable);

        List<CourseResponse> contentResponse = page.getContent().stream().map(
                (course) -> CourseResponse.builder()
                        .courseId(course.getCourseId())
                        .courseName(course.getName())
                        .total(course.getPriceReal())
                        .star(course.getAverageRating())
                        .amount(course.getPrice())
                        .imageUrl(course.getImageUrl())
                        .build()).toList();

        return PageResponse.<CourseResponse>builder()
                .pageNo(pageNo)
                .pageSize(page.getSize())
                .last(page.isLast())
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .content(contentResponse)
                .build();
    }
}
