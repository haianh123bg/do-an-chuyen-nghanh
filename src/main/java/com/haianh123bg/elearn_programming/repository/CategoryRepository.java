package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}