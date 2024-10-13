package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "ticket")
public class Ticket {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ticket_id", nullable = false)
    private Integer id;

    @Column(name = "created_by")
    private Integer createdBy;

    @Size(max = 45)
    @Column(name = "creator_name", length = 45)
    private String creatorName;

    @Column(name = "assignee_to")
    private Integer assigneeTo;

    @Size(max = 45)
    @Column(name = "assignee_name", length = 45)
    private String assigneeName;

    @Size(max = 45)
    @Column(name = "title", length = 45)
    private String title;

    @Size(max = 45)
    @Column(name = "description", length = 45)
    private String description;

    @Size(max = 45)
    @Column(name = "priority", length = 45)
    private String priority;

    @Size(max = 45)
    @Column(name = "status", length = 45)
    private String status;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "resolved_at")
    private LocalDateTime resolvedAt;

    @Size(max = 45)
    @Column(name = "category", length = 45)
    private String category;

    @Size(max = 255)
    @Column(name = "attachments")
    private String attachments;

    @Column(name = "feedback")
    private Float feedback;

}