package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Integer> {
}