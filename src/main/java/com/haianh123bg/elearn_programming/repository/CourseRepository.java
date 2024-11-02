package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Integer> {
}