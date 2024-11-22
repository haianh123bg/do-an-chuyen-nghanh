package com.haianh123bg.elearn_programming.specification;


import com.haianh123bg.elearn_programming.entity.Category;
import com.haianh123bg.elearn_programming.entity.Course;
import com.haianh123bg.elearn_programming.entity.UserHasCourse;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

public class UserHasCourseSpecification {
    public static Specification<UserHasCourse> hasUserId(Integer userId) {
        return (root, query, criteriaBuilder) -> {
            if (userId == null) {
                return criteriaBuilder.conjunction();
            }

            return criteriaBuilder.equal(root.get("id.userId"), userId);
        };
    }

    public static Specification<UserHasCourse> hasSearchKey(String searchKey) {
        return (root, query, criteriaBuilder) -> {
            if (searchKey == null) {
                return criteriaBuilder.conjunction();
            }

            Join<UserHasCourse, Course> courseJoin = root.join("course");
            Join<Course, Category> categoryJoin = root.join("category");

            return criteriaBuilder.or(
                    criteriaBuilder.like(courseJoin.get("name"), searchKey),
                    criteriaBuilder.like(courseJoin.get("name"), searchKey)
            );
        };
    }
}
