package com.haianh123bg.elearn_programming.validator;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = PasswordValidator.class)
@Target({ElementType.FIELD, ElementType.METHOD, ElementType.PARAMETER, ElementType.ANNOTATION_TYPE})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPassword {

    String message() default "Mật khẩu tối thiểu 8 ký tự có đủ cả chữ và số";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
