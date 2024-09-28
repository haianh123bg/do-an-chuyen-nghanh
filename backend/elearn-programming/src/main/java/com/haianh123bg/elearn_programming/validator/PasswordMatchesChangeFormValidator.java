package com.haianh123bg.elearn_programming.validator;

import com.redon_agency.chatbot.dto.request.ChangePasswordForm;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordMatchesChangeFormValidator implements ConstraintValidator<PasswordMatchesChangeForm, ChangePasswordForm> {
    @Override
    public boolean isValid(ChangePasswordForm form, ConstraintValidatorContext context) {
        if (form.getPassword() == null || form.getConfirmPassword() == null) {
            return false;
        }
        return form.getPassword().equals(form.getConfirmPassword());
    }
}
