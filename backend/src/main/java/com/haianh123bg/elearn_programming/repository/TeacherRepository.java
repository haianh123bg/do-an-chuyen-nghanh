package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
}