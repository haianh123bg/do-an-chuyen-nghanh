package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface OrderRepository extends JpaRepository<Order, Integer> {

    @Query("SELECT SUM(o.total) FROM Order o")
    Double sumTotalRevenue();
}