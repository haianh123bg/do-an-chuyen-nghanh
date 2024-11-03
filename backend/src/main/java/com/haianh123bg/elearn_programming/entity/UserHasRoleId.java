package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Entity;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class UserHasRoleId implements Serializable {
    private static final long serialVersionUID = 168634642915131889L;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "role_id", nullable = false)
    private Integer roleId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserHasRoleId that = (UserHasRoleId) o;

        if (!Objects.equals(roleId, that.roleId))
            return false;
        return Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(roleId, userId);
    }

}