package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.Instant;
import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "`order`")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id", nullable = false)
    private Integer id;

    @Size(max = 45)
    @Column(name = "bank_name", length = 45)
    private String bankName;

    @Column(name = "discount")
    private Integer discount;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "price")
    private Integer price;

    @Column(name = "total")
    private Integer total;

    @Column(name = "amount_discount")
    private Integer amountDiscount;

    @Size(max = 45)
    @Column(name = "status", length = 45)
    private String status;

    @Size(max = 100)
    @Column(name = "vnd_ref", length = 100)
    private String vndRef;

    @OneToMany(mappedBy = "order")
    private Set<OrderLine> orderLines = new LinkedHashSet<>();

}