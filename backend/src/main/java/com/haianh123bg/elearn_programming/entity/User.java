package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id", nullable = false)
    private Integer id; // ID của người dùng, tự động tăng và là khóa chính trong bảng

    @Size(max = 40)
    @Column(name = "name", length = 40)
    private String name; // Tên của người dùng, giới hạn tối đa 40 ký tự

    @Size(max = 20)
    @Column(name = "phone_number", length = 20)
    private String phoneNumber; // Số điện thoại của người dùng, giới hạn tối đa 20 ký tự

    @Column
    private String password; // Mật khẩu của người dùng (được mã hóa)

    @Size(max = 10)
    @Column(name = "gender", length = 10)
    private String gender; // Giới tính của người dùng, tối đa 10 ký tự (ví dụ: "Nam", "Nữ")

    @Size(max = 45)
    @Column(name = "email", length = 45)
    private String email; // Email của người dùng, giới hạn tối đa 45 ký tự

    @Column(name = "is_verify")
    private Boolean isVerify; // Trạng thái xác minh email của người dùng (đã xác minh hay chưa)

    @Column(name = "is_enable")
    private Boolean isEnable; // Trạng thái kích hoạt của người dùng (có thể đăng nhập hay không)

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @Column(name = "address")
    private String address;

    @OneToMany(mappedBy = "user")
    private List<UserOtp> userOtps; // Danh sách các OTP (One Time Password) của người dùng

    @ManyToMany
    @JoinTable(
            name = "user_has_role",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id")
    )
    private List<Role> roles; // Danh sách các vai trò của người dùng (mối quan hệ nhiều-nhiều với Role)

    @Column(name = "created_at")
    private LocalDateTime createdAt; // Ngày và giờ khi tài khoản người dùng được tạo

    @OneToOne(mappedBy = "user")
    private Cart cart;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of();
    }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return this.isEnable;
    }
}