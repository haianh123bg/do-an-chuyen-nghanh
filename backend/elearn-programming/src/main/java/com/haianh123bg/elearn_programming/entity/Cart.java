package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "cart")
public class Cart {
    @Id
    @Column(name = "cart_id")
    private Integer cartId;

    @MapsId
    @OneToOne
    @JoinColumn(name = "cart_id", nullable = false)
    private User user;

    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "total_course")
    private Integer totalCourse;

    @OneToMany(mappedBy = "cart")
    private List<CartDetail> cartDetails;

}