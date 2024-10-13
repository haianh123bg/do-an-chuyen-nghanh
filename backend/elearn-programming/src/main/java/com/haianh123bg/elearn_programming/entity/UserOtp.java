package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_otp")
public class UserOtp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "otp_id", nullable = false)
    private Long id;

    @NotNull
    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Size(max = 45)
    @Column(name = "otp_code", length = 45)
    private String otpCode;

    @Size(max = 45)
    @Column(name = "otp_method", length = 45)
    private String otpMethod;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "available_after")
    private LocalDateTime availableAfter;

    @Column(name = "max_attempts")
    private Integer maxAttempts;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_user_id", nullable = false)
    private User userUser;

}