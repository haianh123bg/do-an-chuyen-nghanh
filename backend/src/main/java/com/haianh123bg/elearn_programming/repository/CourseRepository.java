package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.dto.response.MOverviewCourceResponse;
import com.haianh123bg.elearn_programming.entity.Course;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Integer>, JpaSpecificationExecutor<Course> {

    @Query("SELECT c FROM Course c " +
            "WHERE (:searchKey IS NULL OR LOWER(c.name) LIKE LOWER(CONCAT('%', :searchKey, '%')))")
    Page<Course> findPageCourse(@Param("searchKey") String searchKey, Pageable pageable);

    @Query("SELECT c FROM Course c WHERE c.courseId IN :ids")
    List<Course> findByIds(@Param("ids") List<Integer> ids);

    @Query("""
        SELECT
             new com.haianh123bg.elearn_programming.dto.response.MOverviewCourceResponse(
                 COUNT(c.courseId),
                 SUM(c.totalBuyer),
                 COUNT(CASE WHEN c.language = 'VN' THEN 1 END),
                 COUNT(CASE WHEN c.language = 'English' THEN 1 END)
             )
        FROM Course c
                                  
            """)
    MOverviewCourceResponse overview();
}