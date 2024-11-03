package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PermissionRepository extends JpaRepository<Permission, Integer> {

    @Query("SELECT p FROM Permission p WHERE p.name =:name")
    Optional<Permission> findByName(@Param("name") String name);
}