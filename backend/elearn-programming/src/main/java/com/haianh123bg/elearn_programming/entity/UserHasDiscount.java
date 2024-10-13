package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.Instant;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_has_discount")
public class UserHasDiscount {
    @EmbeddedId
    private UserHasDiscountId id;

    @MapsId("userId")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @MapsId("discount")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "discount", nullable = false)
    private Discount discount;

    @Column(name = "quantity")
    private Integer quantity;

    @Column(name = "expired_date")
    private Instant expiredDate;

}