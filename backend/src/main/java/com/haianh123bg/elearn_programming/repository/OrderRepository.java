package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Integer> {
}