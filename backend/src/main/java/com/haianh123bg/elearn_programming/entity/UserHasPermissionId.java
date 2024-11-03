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
public class UserHasPermissionId implements Serializable {
    private static final long serialVersionUID = 5508341130172222694L;

    @Column(name = "user_id", nullable = false)
    private Integer userId;

    @Column(name = "permission_id", nullable = false)
    private Integer permissionId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        UserHasPermissionId that = (UserHasPermissionId) o;

        if (!Objects.equals(permissionId, that.permissionId))
            return false;
        return Objects.equals(userId, that.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(permissionId, userId);
    }

}