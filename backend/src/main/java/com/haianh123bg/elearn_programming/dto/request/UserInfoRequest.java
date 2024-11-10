package com.haianh123bg.elearn_programming.dto.request;

import com.haianh123bg.elearn_programming.utils.GenderEnum;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class UserInfoRequest {

    @NotBlank(message = "Name is required")
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String name;

    @NotNull(message = "Gender is required")
    private GenderEnum gender;

    @NotNull(message = "Date of birth is required")
    @Past(message = "Date of birth must be a date in the past")
    private LocalDate date;

    @NotBlank(message = "Address is required")
    @Size(max = 100, message = "Address must not exceed 100 characters")
    private String address;
}
