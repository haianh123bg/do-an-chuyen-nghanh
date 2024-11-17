package com.haianh123bg.elearn_programming.dto.request;

import com.haianh123bg.elearn_programming.utils.TypeResourceEnum;
import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResourceRequest {
    @NotEmpty
    private String name;

    private String url;

    @NonNull
    private TypeResourceEnum type;

    @NotEmpty
    private String tag;
}
