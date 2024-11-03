package com.haianh123bg.elearn_programming.utils;

import com.haianh123bg.elearn_programming.entity.Role;

import java.util.ArrayList;
import java.util.List;

public class UserUtils {
    public static List<String> getRoles(List<Role> roles) {
        List<String> roleList = new ArrayList<>();
        for (Role role : roles) {
            roleList.add(role.getRoleName());
        }
        return roleList;
    }
}
