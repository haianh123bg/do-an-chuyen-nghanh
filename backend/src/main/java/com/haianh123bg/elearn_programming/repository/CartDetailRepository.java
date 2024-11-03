package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.CartDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartDetailRepository extends JpaRepository<CartDetail, Integer> {
}