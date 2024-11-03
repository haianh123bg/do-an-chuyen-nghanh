package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.CourseHasTag;
import com.haianh123bg.elearn_programming.entity.CourseHasTagId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseHasTagRepository extends JpaRepository<CourseHasTag, CourseHasTagId> {
}