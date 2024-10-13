package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "discount")
public class Discount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "discount_id", nullable = false)
    private Integer id;

    @Column(name = "percent")
    private Integer percent;

    @Column(name = "value")
    private Integer value;

    @Size(max = 45)
    @Column(name = "type", length = 45)
    private String type;

    @Column(name = "lower_limit")
    private Integer lowerLimit;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "expired_date")
    private LocalDateTime expiredDate;

    @ColumnDefault("1")
    @Column(name = "activity")
    private Boolean activity;

    @OneToMany(mappedBy = "discount")
    private Set<UserHasDiscount> userHasDiscounts = new LinkedHashSet<>();

}