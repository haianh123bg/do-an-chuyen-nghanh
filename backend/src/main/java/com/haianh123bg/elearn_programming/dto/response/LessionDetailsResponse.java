package com.haianh123bg.elearn_programming.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import org.joda.time.LocalDate;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LessionDetailsResponse {
    private String title;
    private String description;
    private String type;
    private LocalDate createdAt;
    private LocalDate updatedAt;

    private Integer itemId;

    //BLOG
    private String blogContent;

    //VIDEO_LECTURE
    private String videoLectureUrl;
    private String videoLectureDescription;
}
