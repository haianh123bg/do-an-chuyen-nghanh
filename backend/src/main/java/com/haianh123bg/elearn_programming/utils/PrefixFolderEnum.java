package com.haianh123bg.elearn_programming.utils;

import lombok.Getter;

@Getter
public enum PrefixFolderEnum {
    USER_AVATAR("user/avatar"),
    RESOURCE_TEACHER("teacher");

    private String prefix;
    PrefixFolderEnum(String prefix) {
        this.prefix = prefix;
    }
}
