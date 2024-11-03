package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}