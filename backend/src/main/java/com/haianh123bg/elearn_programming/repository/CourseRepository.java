package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CourseRepository extends JpaRepository<Course, Integer> {

    @Query("SELECT c FROM Course c " +
            "WHERE (:searchKey IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :searchKey, '%')))")
    Page<Course> findPageCourse(@Param("searchKey") String searchKey, Pageable pageable);
}