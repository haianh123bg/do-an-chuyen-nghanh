package com.haianh123bg.elearn_programming.mapper_mapstruct;

import com.haianh123bg.elearn_programming.dto.response.CourseResponse;
import com.haianh123bg.elearn_programming.entity.Course;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.springframework.stereotype.Component;

@Component
@Mapper(componentModel = "spring")
public interface CourseMapperMapstruct {
    @Mapping(source = "courseId", target = "courseId")
    @Mapping(source = "name", target = "courseName")
    @Mapping(source = "priceReal", target = "total")
    @Mapping(source = "averageRating", target = "star")
    @Mapping(source = "price", target = "amount")
    @Mapping(source = "imageUrl", target = "imageUrl")
    CourseResponse toCourseResponse(Course course);
}