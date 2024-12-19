package com.haianh123bg.elearn_programming.mapper;

import com.haianh123bg.elearn_programming.dto.request.CreateCourseRequest;
import com.haianh123bg.elearn_programming.dto.response.CourseResponse;
import com.haianh123bg.elearn_programming.dto.response.MCourseResponse;
import com.haianh123bg.elearn_programming.entity.Category;
import com.haianh123bg.elearn_programming.entity.Course;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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

    public static List<MCourseResponse> mapToCourseResponse(List<Object[]> rawData) {
        List<MCourseResponse> courseResponses = new ArrayList<>();

        for (Object[] row : rawData) {
            MCourseResponse response = MCourseResponse.builder()
                    .courseId((Integer) row[0])                 // courseId
                    .name((String) row[1])                     // name
                    .shortDescription((String) row[2])         // shortDescription
                    .detailDescription((String) row[3])        // detailDescription
                    .createdAt((LocalDateTime) row[4])         // createdAt
                    .updatedAt((LocalDateTime) row[5])         // updatedAt
                    .createdByName((String) row[6])            // createdByName
                    .updatedByName((String) row[7])            // updatedByName
                    .teacherName((String) row[8])              // teacherName
                    .categoryName((String) row[9])             // categoryName
                    .language((String) row[10])                // language
                    .price((Double) row[11])                   // price
                    .priceReal((Double) row[12])               // priceReal
                    .averageRating((Float) row[13])            // averageRating
                    .totalBuyer((Integer) row[14])             // totalBuyer
                    .imageUrl((String) row[15])                // imageUrl
                    .totalModules((Integer) row[16])           // totalModules
                    .totalRevenue((Double) row[17])            // totalRevenue
                    .active((Boolean) row[18])                 // active
                    .build();

            courseResponses.add(response);
        }

        return courseResponses;
    }
}
