package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.UserHasDiscount;
import com.haianh123bg.elearn_programming.entity.UserHasDiscountId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserHasDiscountRepository extends JpaRepository<UserHasDiscount, UserHasDiscountId> {

    @Query("SELECT uhd FROM UserHasDiscount uhd WHERE uhd.id.discount = :discountId AND uhd.quantity > 0 AND uhd.expiredDate > CURRENT_DATE")
    Optional<UserHasDiscount> findByDiscountIdNotExpired(@Param("discountId") Integer discountId);
}