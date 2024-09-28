package com.haianh123bg.elearn_programming.validator;

import com.redon_agency.chatbot.dto.request.RegisterFormRequest;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, RegisterFormRequest> {
    @Override
    public boolean isValid(RegisterFormRequest form, ConstraintValidatorContext context) {
        if (form.getPassword() == null || form.getConfirmPassword() == null) {
            return false;
        }
        return form.getPassword().equals(form.getConfirmPassword());
    }
}
