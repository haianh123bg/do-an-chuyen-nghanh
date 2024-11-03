package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.UserHasPermission;
import com.haianh123bg.elearn_programming.entity.UserHasPermissionId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasPermissionRepository extends JpaRepository<UserHasPermission, UserHasPermissionId> {
}