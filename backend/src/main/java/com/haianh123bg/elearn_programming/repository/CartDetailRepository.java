package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.CartDetail;
import jakarta.persistence.Id;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
    @Query("SELECT c FROM CartDetail c WHERE c.cart.cartId =:cardId AND c.course.courseId =:courseId")
    Optional<CartDetail> findByCartIdAndCourseId(
            @Param(value = "cardId") Integer cartId,
            @Param(value = "courseId") Integer courseId);
}