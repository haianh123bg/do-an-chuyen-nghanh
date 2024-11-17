package com.haianh123bg.elearn_programming.dto.response;

import lombok.experimental.SuperBuilder;

import java.util.List;

@SuperBuilder
public class LessionChoiseExercisesResponse extends LessionDetailsResponse {
    List<ChoiseExercisesResponse> questions;
    Integer size;
}
