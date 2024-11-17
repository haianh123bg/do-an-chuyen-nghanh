package com.haianh123bg.elearn_programming.dto.response;

import jakarta.persistence.Column;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResourceResponse {
    private Long id;

    private String name;

    private String url;

    private String type;

    private String tag;
}
