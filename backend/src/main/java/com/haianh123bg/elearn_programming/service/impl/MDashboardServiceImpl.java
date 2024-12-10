package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.MDashboardResponse;
import com.haianh123bg.elearn_programming.entity.Course;
import com.haianh123bg.elearn_programming.repository.*;
import com.haianh123bg.elearn_programming.service.MDashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MDashboardServiceImpl implements MDashboardService {
    private final CourseRepository courseRepository;
    private final TeacherRepository teacherRepository;
    private final OrderRepository orderRepository;
    private final UserHasCourseRepository userHasCourseRepository;
    private final BlogRepository blogRepository;

    @Override
    public MDashboardResponse overview() {
        Long totalStudent = userHasCourseRepository.count();
        Long totalCourse = courseRepository.count();
        Long totalTeacher = teacherRepository.count();
        Double totalAdsense = 0.0;
        Double totalRevenue = orderRepository.sumTotalRevenue();
        Long totalBlog = blogRepository.count();

        return MDashboardResponse.builder()
                .totalStudent(totalStudent)
                .totalCourse(totalCourse)
                .adsense(totalAdsense)
                .totalTeacher(totalTeacher)
                .totalRevenue(totalRevenue)
                .totalBlog(totalBlog)
                .build();
    }
}
