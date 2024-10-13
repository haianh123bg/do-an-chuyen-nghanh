package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    @Query(value = "SELECT u FROM User u WHERE u.email =:email")
    Optional<User> findByEmail(String email);
}
