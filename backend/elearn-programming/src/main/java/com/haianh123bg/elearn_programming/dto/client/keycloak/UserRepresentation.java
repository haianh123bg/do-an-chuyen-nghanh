package com.redon_agency.chatbot.dto.client.keycloak;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserRepresentation {
    String id;
    String username;
    String firstName;
    String lastName;
    String email;
    boolean emailVerified;
    long createdTimestamp;
    boolean enabled;
    boolean totp;
    List<String> disableableCredentialTypes;
    List<String> requiredActions;
    int notBefore;
    Access access;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class Access {
        boolean manageGroupMembership;
        boolean view;
        boolean mapRoles;
        boolean impersonate;
        boolean manage;
    }
}
