package com.haianh123bg.elearn_programming.dto.response;

import lombok.*;

import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PageResponse <T>{
    private Integer pageNo;
    private Integer pageSize;
    private Long totalElements;
    private Long totalPages;
    private Boolean last;
    private List<T> content;
}
