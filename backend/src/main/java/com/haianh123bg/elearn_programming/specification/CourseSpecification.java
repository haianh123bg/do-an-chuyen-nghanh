package com.haianh123bg.elearn_programming.specification;

import com.haianh123bg.elearn_programming.entity.Category;
import com.haianh123bg.elearn_programming.entity.Course;
import com.haianh123bg.elearn_programming.entity.User;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDateTime;

public class CourseSpecification {

    public static Specification<Course> toMCourseResponse() {
        return (root, query, criteriaBuilder) -> {
            Join<Course, User> createdByJoin = root.join("createdBy");
            Join<Course, User> updatedByJoin = root.join("updatedBy");
            Join<Course, User> teacherJoin = root.join("teacherId");
            Join<Course, Category> categoryJoin = root.join("category");

            assert query != null;
            query.multiselect(
                    root.get("courseId"),           // 0
                    root.get("name"),               // 1
                    root.get("shortDescription"),   // 2
                    root.get("detailDescription"),  // 3
                    root.get("createdAt"),          // 4
                    root.get("updatedAt"),          // 5
                    createdByJoin.get("name"),      // 6
                    updatedByJoin.get("name"),      // 7
                    teacherJoin.get("name"),        // 8
                    categoryJoin.get("name"),       // 9
                    root.get("language"),           // 10
                    root.get("price"),              // 11
                    root.get("priceReal"),          // 12
                    root.get("averageRating"),      // 13
                    root.get("totalBuyer"),         // 14
                    root.get("imageUrl"),           // 15
                    root.get("totalModules"),       // 16
                    root.get("totalRevenue"),       // 17
                    root.get("active")              // 18
            );
            return query.getRestriction();
        };
    }

    public static Specification<Course> hasCategoryId(Integer categoryId) {
        return (root, query, criteriaBuilder) -> {
            if (categoryId == null) {
                return criteriaBuilder.conjunction();
            }
            // Thực hiện join với bảng "category"
            Join<Course, Category> categoryJoin = root.join("category");

            // So sánh id của category với categoryId được truyền vào
            return criteriaBuilder.equal(categoryJoin.get("id"), categoryId);
        };
    }

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
