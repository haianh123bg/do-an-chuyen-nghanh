package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User> {

    @Query(value = "SELECT u FROM User u WHERE u.email =:email")
    Optional<User> findByEmail(String email);
}
