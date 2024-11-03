package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Integer> {

    @Query("SELECT r FROM Role r WHERE r.roleName =:roleName")
    Optional<Role> findByRoleName(String roleName);
}