package com.haianh123bg.elearn_programming.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class CourseHasTagId implements Serializable {
    private static final long serialVersionUID = 3381736504311817402L;
    @NotNull
    @Column(name = "course_id", nullable = false)
    private Integer courseId;

    @NotNull
    @Column(name = "tag_id", nullable = false)
    private Integer tagId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        CourseHasTagId entity = (CourseHasTagId) o;
        return Objects.equals(this.tagId, entity.tagId) &&
                Objects.equals(this.courseId, entity.courseId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(tagId, courseId);
    }

}