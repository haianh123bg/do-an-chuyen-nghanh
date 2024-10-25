package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedHashSet;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "cart_id", nullable = false)
    private User user;

    @Column(name = "total_price")
    private Integer totalPrice;

    @Column(name = "total_course")
    private Integer totalCourse;

    @OneToMany(mappedBy = "cart")
    private Set<CartDetail> cartDetails = new LinkedHashSet<>();

}