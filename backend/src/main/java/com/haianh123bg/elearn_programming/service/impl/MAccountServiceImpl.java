package com.haianh123bg.elearn_programming.service.impl;

import com.haianh123bg.elearn_programming.dto.response.PageResponse;
import com.haianh123bg.elearn_programming.dto.response.UserResponse;
import com.haianh123bg.elearn_programming.entity.User;
import com.haianh123bg.elearn_programming.repository.UserRepository;
import com.haianh123bg.elearn_programming.service.MAccountService;
import com.haianh123bg.elearn_programming.specification.UserSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MAccountServiceImpl implements MAccountService {
    private final UserRepository userRepository;

    public MAccountServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public PageResponse<UserResponse> getPageUser(
            Integer pageNo,
            Integer pageSize,
            String sortBy,
            String sortDir,
            String searchKey,
            LocalDateTime begin,
            LocalDateTime end) {
        // Tạo specification
        Specification<User> spec = Specification.where(
                UserSpecification.hasSearchKey(searchKey).and(UserSpecification.isActiveBetween(begin, end))
        );
        // Tạo sort
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending() : Sort.by(sortBy).descending();
        // Tạo pageable
        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);

        Page<User> pageUsers = userRepository.findAll(spec, pageable);

        List<UserResponse> content = pageUsers.getContent().stream().map(
                (user) -> UserResponse
                        .builder()
                        .email(user.getEmail())
                        .isEnable(user.getIsEnable())
                        .totalSpending(user.getTotalSpending())
                        .totalBuyer(user.getTotalBuyer())
                        .name(user.getName())
                        .id(user.getId())
                        .build()
        ).toList();

        return PageResponse.<UserResponse>builder()
                .pageNo(pageNo)
                .pageSize(pageUsers.getSize())
                .totalElements(pageUsers.getTotalElements())
                .totalPages(pageUsers.getTotalPages())
                .last(pageUsers.isLast())
                .content(content)
                .build();
    }
}
