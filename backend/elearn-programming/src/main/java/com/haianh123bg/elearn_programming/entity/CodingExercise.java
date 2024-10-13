package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "coding_exercise")
public class CodingExercise {
    @Id
    @Column(name = "item_id", nullable = false)
    private Integer id;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "item_id", nullable = false)
    private Item item;

    @Size(max = 255)
    @Column(name = "url")
    private String url;

}