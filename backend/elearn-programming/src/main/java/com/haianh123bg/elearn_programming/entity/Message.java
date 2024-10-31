package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private Long id;

    @Column(name = "user_to")
    private Integer to;

    @Column(name = "user_from")
    private Integer from;

    @Lob
    @Column(name = "content")
    private String content;

    @Size(max = 20)
    @Column(name = "type", length = 20)
    private String type;

    @Column(name = "create_at")
    private LocalDateTime createAt;
}