package com.haianh123bg.elearn_programming.mapper;

import com.haianh123bg.elearn_programming.dto.request.CreateCourseRequest;
import com.haianh123bg.elearn_programming.dto.response.CourseResponse;
import com.haianh123bg.elearn_programming.entity.Category;
import com.haianh123bg.elearn_programming.entity.Course;
import org.springframework.data.domain.Page;

import java.time.LocalDateTime;

public class CourseMapper {
    public static Course toCourse(CreateCourseRequest request, Integer userId, Category category) {
        return Course.builder()
                .name(request.getCourseName())
                .shortDescription(request.getShortDescription())
                .detailDescription(request.getDetailDescription())
                .createdBy(userId)
                .teacherId(userId)
                .category(category)
                .createdAt(LocalDateTime.now())
                .build();
    }

    public static CourseResponse courseToCourseResponse(Course course) {
        return CourseResponse.builder()
                .courseId(course.getCourseId())
                .star(course.getAverageRating())
                .courseName(course.getName())
                .totalRevenue(course.getTotalRevenue())
                .total(course.getPriceReal())
                .totalBuyer(course.getTotalBuyer())
                .amount(course.getPrice())
                .imageUrl(course.getImageUrl())
                .active(course.getActive())
                .build();
    }
}
