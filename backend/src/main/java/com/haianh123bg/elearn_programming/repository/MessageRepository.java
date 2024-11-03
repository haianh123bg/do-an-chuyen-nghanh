package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}