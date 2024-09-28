package com.redon_agency.chatbot.dto.client.keycloak;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.*;
import lombok.experimental.FieldDefaults;


@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GetUserParams {
    Boolean briefRepresentation;
    String email;
    Boolean emailVerified;
    Boolean enabled;
    Boolean exact;
    Integer first;
    String firstName;
    String idpAlias;
    String idpUserId;
    String lastName;
    Integer max;
    String query;
    String search;
    String username;
}
