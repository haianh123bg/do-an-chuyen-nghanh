package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id", nullable = false)
    private Integer courseId;

    @Size(max = 255)
    @Column(name = "name")
    private String name;

    @Size(max = 500)
    @Column(name = "short_description", length = 500)
    private String shortDescription;

    @Lob
    @Column(name = "detail_description")
    private String detailDescription;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "created_by")
    private Integer createdBy;

    @Column(name = "updated_by")
    private Integer updatedBy;

    @Column(name = "teacher_id")
    private Integer teacherId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    @Size(max = 45)
    @Column(name = "language", length = 45)
    private String language;

    @Column(name = "price")
    private Double price;

    @Column(name = "price_real")
    private Double priceReal;

    @Column(name = "average_rating")
    private Float averageRating;

    @Column(name = "total_buyer")
    private Long totalBuyer;

    @Column(name = "image_url")
    private String imageUrl;

    @OneToMany(mappedBy = "course")
    private List<Module> modules;

    @Column(name = "total_revenue")
    private Double totalRevenue;


}