package com.haianh123bg.elearn_programming.dto.client.google;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;
import lombok.experimental.FieldDefaults;

/**
 * DTO (Data Transfer Object) representing the response from Google's token exchange endpoint.
 * It contains the information about the access token, refresh token, token type, and other related fields.
 */
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE) // All fields are private by default
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class) // Maps JSON properties from snake_case to camelCase automatically
public class GoogleExchangeToken {

    // The access token issued by Google's OAuth2 server
    String accessToken;

    // The duration (in seconds) for which the access token is valid
    Long expiresIn;

    // The refresh token used to obtain new access tokens when the current one expires
    String refreshToken;

    // The type of the token issued (usually "Bearer")
    String tokenType;

    // The scope of access granted by the token (e.g., user info, email, etc.)
    String scope;
}
