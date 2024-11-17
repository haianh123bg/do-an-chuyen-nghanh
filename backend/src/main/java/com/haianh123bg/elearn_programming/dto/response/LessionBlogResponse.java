package com.haianh123bg.elearn_programming.dto.response;


import lombok.Getter;
import lombok.Setter;
import lombok.experimental.SuperBuilder;

@SuperBuilder
@Setter
@Getter
public class LessionBlogResponse extends LessionDetailsResponse{
    String content;
}
