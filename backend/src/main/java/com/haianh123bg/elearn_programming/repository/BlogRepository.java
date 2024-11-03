package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Blog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlogRepository extends JpaRepository<Blog, Integer> {
}