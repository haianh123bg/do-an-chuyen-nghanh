package com.haianh123bg.elearn_programming.entity;


import com.haianh123bg.elearn_programming.utils.OtpMethodEnum;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbluser_otp_log")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserOtpLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", insertable = false, updatable = false)  // Chỉ để tham chiếu, không cần thao tác
    private Long userId;

    @Column(name = "otp_code", length = 10, nullable = false)
    private String otpCode;

    @Enumerated(EnumType.STRING)
    @Column(name = "otp_method", nullable = false)
    private OtpMethodEnum otpMethod; // Sử dụng enum cho phương thức OTP

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

