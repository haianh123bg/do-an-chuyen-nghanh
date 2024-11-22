package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.UserHasCourse;
import com.haianh123bg.elearn_programming.entity.UserHasCourseId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface UserHasCourseRepository extends JpaRepository<UserHasCourse, UserHasCourseId>, JpaSpecificationExecutor<UserHasCourse> {
}