package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.UserHasDiscount;
import com.haianh123bg.elearn_programming.entity.UserHasDiscountId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserHasDiscountRepository extends JpaRepository<UserHasDiscount, UserHasDiscountId> {
}