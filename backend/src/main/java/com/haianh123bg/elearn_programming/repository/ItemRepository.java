package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ItemRepository extends JpaRepository<Item, Integer> {
    @Query("SELECT i FROM Item i WHERE i.module.id = :moduleId AND i.order >= :startingOrder")
    List<Item> findByModuleIdAndOrderGreaterThan(
            @Param(value = "moduleId") Integer moduleId,
            @Param(value = "startingOrder") Integer startingOrder
    );

    @Query("SELECT CASE WHEN COUNT(i) > 0 THEN true ELSE false END FROM Item i WHERE i.module.id = :moduleId AND i.order = :order")
    boolean existsByModuleIdAndOrder(@Param("moduleId") Integer moduleId, @Param("order") Integer order);
}