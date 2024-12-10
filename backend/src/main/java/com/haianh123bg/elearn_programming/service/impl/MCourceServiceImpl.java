package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.MOverviewCourceResponse;
import com.haianh123bg.elearn_programming.repository.CourseRepository;
import com.haianh123bg.elearn_programming.service.MCourceService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class MCourceServiceImpl implements MCourceService {
    CourseRepository courseRepository;

    @Override
    public MOverviewCourceResponse overviewCourse() {
        MOverviewCourceResponse response = courseRepository.overview();
        if (response.getTotalBuyer() == null) {
            response.setTotalBuyer(0L);
        }

        return response;
    }
}
