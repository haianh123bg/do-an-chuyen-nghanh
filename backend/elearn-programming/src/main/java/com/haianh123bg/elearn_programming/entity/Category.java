package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.util.LinkedHashSet;
import java.util.Set;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "category_id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @Column(name = "name", length = 100)
    private String name;

    @Size(max = 100)
    @Column(name = "description", length = 100)
    private String description;

    @Column(name = "total_course")
    private Integer totalCourse;

    @OneToMany(mappedBy = "category")
    private Set<Course> courses = new LinkedHashSet<>();

}