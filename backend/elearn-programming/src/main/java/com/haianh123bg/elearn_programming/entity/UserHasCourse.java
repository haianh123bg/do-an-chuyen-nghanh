package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_has_course")
public class UserHasCourse {
    @EmbeddedId
    private UserHasCourseId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @MapsId("courseId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "buy_date")
    private LocalDateTime buyDate;

    @Column(name = "is_used")
    private Boolean isUsed;

    @Column(name = "expired_time")
    private LocalDateTime expiredTime;

    @Column(name = "progress")
    private LocalDateTime progress;

}