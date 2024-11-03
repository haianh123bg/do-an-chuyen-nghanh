package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Item;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ItemRepository extends JpaRepository<Item, Integer> {
}