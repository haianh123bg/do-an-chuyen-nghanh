package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.RoleHasPermission;
import com.haianh123bg.elearn_programming.entity.RoleHasPermissionId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleHasPermissionRepository extends JpaRepository<RoleHasPermission, RoleHasPermissionId> {
}