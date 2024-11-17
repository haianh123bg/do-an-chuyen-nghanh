package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ModuleRepository extends JpaRepository<Module, Integer> {

    // Truy vấn để tìm các Module có courseId và order lớn hơn startingOrder
    @Query("SELECT m FROM Module m WHERE m.course.courseId = :courseId AND m.order >= :startingOrder")
    List<Module> findByCourseIdAndOrderGreaterThan(@Param("courseId") Integer courseId, @Param("startingOrder") Integer startingOrder);

    // Truy vấn để kiểm tra tồn tại Module có courseId và order cụ thể
    @Query("SELECT CASE WHEN COUNT(m) > 0 THEN true ELSE false END FROM Module m WHERE m.course.courseId = :courseId AND m.order = :order")
    boolean existsByCourseIdAndOrder(@Param("courseId") Integer courseId, @Param("order") Integer order);
}