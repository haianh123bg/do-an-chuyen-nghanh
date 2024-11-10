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
import java.util.concurrent.atomic.AtomicInteger;

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

        AtomicInteger moduleIndex = new AtomicInteger(1);
        AtomicInteger itemIndex = new AtomicInteger(1); // Đánh số thứ tự cho toàn bộ Item

        // Sắp xếp và đánh số thứ tự cho các Module và Item
        List<ModuleResponse> modulesResponse = course.getModules().stream()
                .sorted(Comparator.comparing(Module::getOrder)) // Sắp xếp Module
                .map((module) -> {

                    // Sắp xếp và đánh số thứ tự cho các Item (liên tục từ 1 đến hết)
                    List<ItemResponse> itemsResponse = module.getItems().stream()
                            .sorted(Comparator.comparing(Item::getOrder)) // Sắp xếp Item
                            .map((item) -> ItemResponse.builder()
                                    .itemId(item.getId())
                                    .itemName(item.getTitle())
                                    .index(itemIndex.getAndIncrement()) // Đánh số thứ tự toàn bộ Item liên tục
                                    .build()
                            ).toList();

                    return ModuleResponse.builder()
                            .moduleId(module.getId())
                            .moduleName(module.getName())
                            .index(moduleIndex.getAndIncrement()) // Đánh số thứ tự cho Module
                            .items(itemsResponse)
                            .build();
                }).toList();

        return CourseCategoryResponse.builder()
                .courseId(courseId)
                .courseName(course.getName())
                .modules(modulesResponse)
                .build();
    }

    @Override
    public LessionDetailsResponse getLessionDetails(Integer courseId, Integer itemId) {
        return null;
    }


}
