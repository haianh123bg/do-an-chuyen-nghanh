package com.haianh123bg.elearn_programming.exception;


import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class AppResponse extends RuntimeException {
    private AppCode appCode;
    public AppResponse(AppCode appCode) {
        super(appCode.getMessage());
        this.appCode = appCode;
    }
}