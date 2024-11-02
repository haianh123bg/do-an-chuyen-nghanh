package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Module;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ModuleRepository extends JpaRepository<Module, Integer> {
}