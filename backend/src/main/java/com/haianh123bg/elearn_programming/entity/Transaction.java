package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tb_transactions")
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Tự động tăng id
    private Integer id;

    @Column(nullable = false, length = 100)
    private String gateway;

    @Column(name = "transaction_date", nullable = false)
    private LocalDateTime transactionDate;

    @Column(name = "account_number", length = 100)
    private String accountNumber;

    @Column(name = "sub_account", length = 250)
    private String subAccount;

    @Column(name = "amount_in", nullable = false, precision = 20, scale = 2)
    private BigDecimal amountIn;

    @Column(name = "amount_out", nullable = false, precision = 20, scale = 2)
    private BigDecimal amountOut;

    @Column(nullable = false, precision = 20, scale = 2)
    private BigDecimal accumulated;

    @Column(length = 250)
    private String code;

    @Column(name = "transaction_content", columnDefinition = "TEXT")
    private String transactionContent;

    @Column(name = "reference_number", length = 255)
    private String referenceNumber;

    @Column(columnDefinition = "TEXT")
    private String body;

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt;
}
