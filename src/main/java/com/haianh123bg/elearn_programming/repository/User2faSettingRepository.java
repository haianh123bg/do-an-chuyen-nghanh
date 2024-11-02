package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.User2faSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface User2faSettingRepository extends JpaRepository<User2faSetting, Integer> {
}