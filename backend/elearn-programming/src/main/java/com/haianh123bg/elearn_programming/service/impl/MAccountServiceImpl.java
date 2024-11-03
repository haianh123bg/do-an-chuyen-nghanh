package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.PageResponse;
import com.haianh123bg.elearn_programming.dto.response.UserResponse;
import com.haianh123bg.elearn_programming.service.MAccountService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MAccountServiceImpl implements MAccountService {
    @Override
    public PageResponse<UserResponse> getPageUser(
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            String sortDir,
            String searchKey,
            LocalDateTime beginTime,
            LocalDateTime endTime) {
        return null;
    }
}
