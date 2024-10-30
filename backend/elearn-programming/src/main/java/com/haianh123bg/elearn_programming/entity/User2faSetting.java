package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_2fa_setting")
public class User2faSetting {
    @Id
    @Column(name = "user_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "otp_sms_enabled")
    private Boolean otpSmsEnabled;

    @Column(name = "otp_email_enabled")
    private Boolean otpEmailEnabled;

    @Column(name = "google_authenticator_enabled")
    private Boolean googleAuthenticatorEnabled;

    @Size(max = 500)
    @Column(name = "google_authenticator_secret", length = 500)
    private String googleAuthenticatorSecret;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "update_at")
    private LocalDateTime updateAt;

}