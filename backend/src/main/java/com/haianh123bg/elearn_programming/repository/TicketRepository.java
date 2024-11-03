package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
}