package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbluser_2fa_settings")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User2FASettings {

    @Id
    @Column(name = "user_id")
    private Long userId;

    @Column(name = "otp_sms_enabled", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean otpSmsEnabled = false;

    @Column(name = "otp_email_enabled", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean otpEmailEnabled = false;

    @Column(name = "google_authenticator_enabled", nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean googleAuthenticatorEnabled = false;

    @Column(name = "google_authenticator_secret", length = 255)
    private String googleAuthenticatorSecret;

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }

    //ORM
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
}
