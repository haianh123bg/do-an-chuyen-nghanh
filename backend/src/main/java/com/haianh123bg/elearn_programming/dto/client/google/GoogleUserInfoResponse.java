package com.haianh123bg.elearn_programming.dto.client.google;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import java.io.Serializable;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GoogleUserInfoResponse implements Serializable {
    @JsonProperty("id")
    private String id;

    @JsonProperty("email")
    private String email;

    @JsonProperty("verified_email")
    private boolean verified_email;

    @JsonProperty("name")
    private String name;

    @JsonProperty("given_name")
    private String given_name;

    @JsonProperty("family_name")
    private String family_name;

    @JsonProperty("picture")
    private String picture;

    @JsonProperty("locale")
    private String locale;
}
