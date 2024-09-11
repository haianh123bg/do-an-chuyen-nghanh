package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbluser_sessions")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserSession {

    @Id
    @Column(name = "session_id", length = 255)
    private String sessionId;

    @Column(name = "user_id", insertable = false, updatable = false)  // Chỉ để tham chiếu, không cần thao tác
    private Long userId;

    @Column(name = "is_2fa_verified", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean is2faVerified = false;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt;

    //ORM
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)  // Khóa ngoại tham chiếu đến bảng User
    private User user;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}

