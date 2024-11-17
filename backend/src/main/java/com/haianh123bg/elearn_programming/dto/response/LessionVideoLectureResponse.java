package com.haianh123bg.elearn_programming.dto.response;

import lombok.experimental.SuperBuilder;

@SuperBuilder
public class LessionVideoLectureResponse extends LessionDetailsResponse{
    String videoUrl;
}
