package com.haianh123bg.elearn_programming.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MOverviewCourceResponse {
    private Long totalCourse;
    private Long totalBuyer;
    private Long languageVN;
    private Long languageEnglish;
}
