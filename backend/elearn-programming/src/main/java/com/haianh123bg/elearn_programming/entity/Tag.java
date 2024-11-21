package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
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
@Table(name = "tag")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "tag_id", nullable = false)
    private Integer id;

    @Size(max = 45)
    @NotNull
    @Column(name = "tag_name", nullable = false, length = 45)
    private String tagName;

    @Column(name = "total_course")
    private Integer totalCourse;

    @ManyToMany(mappedBy = "tags")
    private Set<Course> courses = new LinkedHashSet<>();

}