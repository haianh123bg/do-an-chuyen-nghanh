package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Discount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DiscountRepository extends JpaRepository<Discount, Integer> {
}