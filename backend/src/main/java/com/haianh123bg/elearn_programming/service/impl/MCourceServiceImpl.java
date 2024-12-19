package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.MCourseResponse;
import com.haianh123bg.elearn_programming.dto.response.MOverviewCourceResponse;
import com.haianh123bg.elearn_programming.dto.response.PageResponse;
import com.haianh123bg.elearn_programming.entity.Course;
import com.haianh123bg.elearn_programming.entity_manager.CouseManager;
import com.haianh123bg.elearn_programming.mapper.CourseMapper;
import com.haianh123bg.elearn_programming.repository.CourseRepository;
import com.haianh123bg.elearn_programming.service.MCourceService;
import com.haianh123bg.elearn_programming.specification.CourseSpecification;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MCourceServiceImpl implements MCourceService {
    CourseRepository courseRepository;
    CouseManager couseManager;

    @Override
    public MOverviewCourceResponse overviewCourse() {
        MOverviewCourceResponse response = courseRepository.overview();
        if (response.getTotalBuyer() == null) {
            response.setTotalBuyer(0L);
        }

        return response;
    }

    @Override
    public PageResponse<MCourseResponse> pageCourse(
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            String sortDir,
            String searchKey,
            LocalDateTime begin,
            LocalDateTime end
    ) {
        // Tạo specification
        Specification<Course> spec = Specification.where(
                CourseSpecification.hasSearchKey(searchKey)
                        .and(CourseSpecification.isActiveBetween(begin, end))
        );

        // Tạo sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.DESC.name()) ? Sort.by(sortBy).descending(): Sort.by(sortBy).ascending();

        // Tạo pageable
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);

        Page<Course> page = courseRepository.findAll(spec, pageable);


        return PageResponse.<MCourseResponse>builder()
                .pageNo(pageNo)
                .pageSize(pageSize)
                .totalPages(courses.getTotalPages())
                .totalElements(courses.getTotalElements())
                .last(courses.isLast())
                .content(content)
                .build();
    }
}
