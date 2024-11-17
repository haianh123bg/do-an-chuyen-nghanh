package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
}