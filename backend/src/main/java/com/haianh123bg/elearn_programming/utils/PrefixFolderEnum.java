package com.haianh123bg.elearn_programming.utils;

import lombok.Getter;

@Getter
public enum PrefixFolderEnum {
    USER_AVATAR("user/avatar");

    private String prefix;
    PrefixFolderEnum(String prefix) {
        this.prefix = prefix;
    }
}
