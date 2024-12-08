package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Bank;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BankRepository extends JpaRepository<Bank, Integer> {

    @Query(value = "SELECT b FROM Bank b WHERE b.user.id =:userId")
    Optional<Bank> findByUserId(Integer userId);
}