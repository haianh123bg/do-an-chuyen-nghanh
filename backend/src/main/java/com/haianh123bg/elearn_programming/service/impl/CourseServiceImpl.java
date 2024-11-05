package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.*;
import com.haianh123bg.elearn_programming.entity.Course;
import com.haianh123bg.elearn_programming.entity.Item;
import com.haianh123bg.elearn_programming.entity.Module;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.repository.CourseRepository;
import com.haianh123bg.elearn_programming.service.CourseService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Comparator;
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

    @Override
    public CourseCategoryResponse getCategoryOfCourse(Integer courseId) {
        Course course = courseRepository.findById(courseId).orElseThrow(
                () -> new AppException(ErrorCode.COURSE_NOT_EXIST)
        );

        // Sắp xếp các Module theo thứ tự tăng dần dựa trên order
        List<ModuleResponse> modulesResponse = course.getModules().stream()
                .sorted(Comparator.comparing(Module::getOrder)) // Sắp xếp Module
                .map((module) -> {
                    // Sắp xếp Item theo thứ tự tăng dần dựa trên order
                    List<ItemResponse> itemsResponse = module.getItems().stream()
                            .sorted(Comparator.comparing(Item::getOrder)) // Sắp xếp Item
                            .map((item) -> ItemResponse.builder()
                                    .itemId(item.getId())
                                    .itemName(item.getTitle())
                                    .build()
                            ).toList();

                    return ModuleResponse.builder()
                            .moduleId(module.getId())
                            .moduleName(module.getName())
                            .items(itemsResponse)
                            .build();
                }).toList();

        return CourseCategoryResponse.builder()
                .courseId(courseId)
                .courseName(course.getName())
                .modules(modulesResponse)
                .build();
    }

}
