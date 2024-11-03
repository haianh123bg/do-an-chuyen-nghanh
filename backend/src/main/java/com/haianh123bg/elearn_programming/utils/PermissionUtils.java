package com.haianh123bg.elearn_programming.utils;

import com.haianh123bg.elearn_programming.entity.Permission;
import com.haianh123bg.elearn_programming.repository.PermissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class PermissionUtils {
    private final PermissionRepository permissionRepository;

    public List<Permission> getBasicPermission() {
        Permission basicPermission = permissionRepository.findByName(PermissionEnum.IS_USER.name()).orElseGet(
                () -> permissionRepository.save(
                        Permission.builder()
                                .name(PermissionEnum.IS_USER.name())
                                .build()
                )
        );
        return List.of(basicPermission);
    }
}
