package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.UserOtp;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserOtpRepository extends JpaRepository<UserOtp, Long> {
}