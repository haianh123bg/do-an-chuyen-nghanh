package com.haianh123bg.elearn_programming.specification;

import com.haianh123bg.elearn_programming.entity.Course;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class CourseSpecification {
    public static Specification<Course> hasTeacherId(Integer teacherId) {
        return (root, query, criteriaBuilder) -> {
            if (teacherId == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.or(
                    criteriaBuilder.equal(root.get("name"), teacherId)
            );
        };
    }

    public static Specification<Course> hasSearchKey(String searchKey) {
        return (root, query, criteriaBuilder) -> {
            if (searchKey == null || searchKey.isEmpty()) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.or(
                    criteriaBuilder.like(root.get("name"), "%" + searchKey + "%")
            );
        };
    }

    public static Specification<Course> isActiveBetween(LocalDateTime begin, LocalDateTime end) {
        return (root, query, criteriaBuilder) -> {
            // Trường hợp 1: Cả hai đều null -> Không có điều kiện
            if (begin == null && end == null) {
                return criteriaBuilder.conjunction();
            }

            // Trường hợp 2: chỉ end null -> Kiểm tra các bản ghi bắt đầu trước end
            if (begin == null) {
                return criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), end);
            }

            // Trường hợp 3: chỉ begin null -> Kiểm tra các bản ghi bắt đầu sau begin
            if (end == null) {
                return criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), begin);
            }

            // Trường hợp 4: Cả begin và end đều không null -> Kiểm tra các bản ghi trong khoảng
            return criteriaBuilder.and(
                    criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), begin),
                    criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), end)
            );
        };
    }
}
