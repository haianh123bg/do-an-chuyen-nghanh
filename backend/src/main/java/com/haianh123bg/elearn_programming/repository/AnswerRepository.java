package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
}