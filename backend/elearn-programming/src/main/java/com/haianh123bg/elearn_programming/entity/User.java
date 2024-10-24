package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

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
    private Integer id;

    @Size(max = 40)
    @Column(name = "name", length = 40)
    private String name;

    @Size(max = 20)
    @Column(name = "phone_number", length = 20)
    private String phoneNumber;

    @Column
    private String password;

    @Size(max = 10)
    @Column(name = "gender", length = 10)
    private String gender;

    @Size(max = 45)
    @Column(name = "email", length = 45)
    private String email;

    @Column(name = "is_verify")
    private Boolean isVerify;

    @Column(name = "is_enable")
    private Boolean isEnable;

    @OneToOne(mappedBy = "user")
    private User2faSetting user2faSetting;

    @OneToMany(mappedBy = "user")
    private Set<UserHasCourse> userHasCourses = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "users")
    private Set<Permission> permissions = new LinkedHashSet<>();

    @ManyToMany(mappedBy = "users")
    private Set<Role> roles = new LinkedHashSet<>();

    @OneToMany(mappedBy = "userUser")
    private Set<UserOtp> userOtps = new LinkedHashSet<>();

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