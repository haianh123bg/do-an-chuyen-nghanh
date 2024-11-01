package com.haianh123bg.elearn_programming.utils;

import com.haianh123bg.elearn_programming.entity.Permission;
import com.haianh123bg.elearn_programming.entity.Role;
import com.haianh123bg.elearn_programming.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
public class RoleUtils {
    private final RoleRepository roleRepository;
    private final PermissionUtils permissionUtils;

    public List<Role> createBasicRole() {
        List<Role> response = new ArrayList<>();

        Role role = roleRepository.findByRoleName(BasicRoleEnum.USER.name()).orElseGet(() -> {
            List<Permission> permission = permissionUtils.getBasicPermission();
            return roleRepository.save(Role.builder()
                    .roleName(BasicRoleEnum.USER.name())
                    .permissions(permission)
                    .build());
        });
        response.add(role);
        return response;
    }
}
