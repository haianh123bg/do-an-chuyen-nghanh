package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.CodingExercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CodingExerciseRepository extends JpaRepository<CodingExercise, Integer> {
}