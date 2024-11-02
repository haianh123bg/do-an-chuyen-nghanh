package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.UserHasRole;
import com.haianh123bg.elearn_programming.entity.UserHasRoleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasRoleRepository extends JpaRepository<UserHasRole, UserHasRoleId> {
}