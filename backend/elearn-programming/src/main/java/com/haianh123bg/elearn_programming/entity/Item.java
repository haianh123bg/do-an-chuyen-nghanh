package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "item")
public class Item {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "description")
    private String description;

    @Column(name = "created_at")
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @Size(max = 45)
    @NotNull
    @Column(name = "type", nullable = false, length = 45)
    private String type;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id")
    private Module module;

    @OneToOne(mappedBy = "item")
    private Blog blog;

    @OneToOne(mappedBy = "item")
    private CodingExercise codingExercise;

    @OneToMany(mappedBy = "item")
    private Set<Comment> comments = new LinkedHashSet<>();

    @OneToOne(mappedBy = "item")
    private VideoLecture videoLecture;

}