package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChoiseExercisesResponse {
    private Long id;
    private String content;
    private String difficulty;

    List<AnswerResponse> answers;
}
