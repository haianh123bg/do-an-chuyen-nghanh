package com.haianh123bg.elearn_programming.dto.client.google;

import lombok.*;

/**
 * DTO (Data Transfer Object) representing the response from Google's reCAPTCHA V2 verification API.
 * This class contains information about whether the reCAPTCHA was successful, the timestamp of the challenge,
 * the hostname of the request, and any error codes that may have been returned.
 */
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RecaptchaV2 {

    // Indicates whether the reCAPTCHA validation was successful (true or false)
    private boolean success;

    // Timestamp of the challenge when the reCAPTCHA was solved
    private String challengeTs;

    // Hostname where the reCAPTCHA was solved
    private String hostname;

    // An array of error codes returned in case the reCAPTCHA validation fails
    private String[] errorCodes;
}
