package com.haianh123bg.elearn_programming.dto.request;

import com.haianh123bg.elearn_programming.utils.TypeItemEnum;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class CreateItemRequest {
    TypeItemEnum type;

    String title;
    String description;
    Integer order;

    // BLOG
    String content;

    // CODING_EXERCISE // VIDEO_LECTURE
    String url;
}
