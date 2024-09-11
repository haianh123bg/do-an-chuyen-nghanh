package com.haianh123bg.elearn_programming.entity;

import com.haianh123bg.elearn_programming.utils.RoleEnum;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tblrole")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Role {
    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "role_name")
    private RoleEnum roleName;
}
