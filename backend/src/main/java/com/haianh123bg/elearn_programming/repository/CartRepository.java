package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {
}