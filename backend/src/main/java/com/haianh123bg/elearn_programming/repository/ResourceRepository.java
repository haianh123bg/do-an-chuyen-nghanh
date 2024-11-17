package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ResourceRepository extends JpaRepository<Resource, Long> {
}