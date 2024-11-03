package com.haianh123bg.elearn_programming.service;

import com.haianh123bg.elearn_programming.dto.response.PageResponse;
import com.haianh123bg.elearn_programming.dto.response.UserResponse;

import java.time.LocalDateTime;

public interface MAccountService {
    PageResponse<UserResponse> getPageUser(Integer pageNo, Integer pageSize, String sortBy, String sortDir, String searchKey, LocalDateTime beginTime, LocalDateTime endTime);
}
