package com.redon_agency.chatbot.dto.client.keycloak;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;
import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class TokenIntrospectResponse {
    // Thông tin thời gian token
    long exp; // Thời gian hết hạn của token (epoch time)
    long iat; // Thời gian phát hành của token (epoch time)
    String jti; // ID của token

    // Thông tin người dùng và phiên
    String iss; // Issuer - nơi phát hành token
    String aud; // Audience - nơi mà token được cấp phát
    String sub; // Subject - định danh của người dùng
    String typ; // Loại token, ví dụ "Bearer"
    String azp; // Authorized party - client đã cấp phát token
    String sid; // Session ID - ID của phiên

    // Thông tin truy cập
    String acr; // Authentication context class reference
    List<String> allowedOrigins; // Danh sách các nguồn được phép truy cập

    // Thông tin vai trò
    RealmAccess realmAccess; // Vai trò trong realm
    ResourceAccess resourceAccess; // Vai trò trong tài nguyên

    // Phạm vi và thông tin người dùng
    String scope; // Phạm vi truy cập của token
    boolean emailVerified; // Địa chỉ email đã xác minh hay chưa
    String name; // Tên đầy đủ của người dùng
    String preferredUsername; // Tên đăng nhập ưa thích
    String givenName; // Tên
    String familyName; // Họ
    String email; // Địa chỉ email

    // Thông tin client
    String clientId; // ID của client
    String username; // Tên đăng nhập của người dùng
    String tokenType; // Loại token

    // Trạng thái token
    boolean active; // Token có đang hoạt động hay không

    // Lớp RealmAccess để ánh xạ thông tin truy cập của realm
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class RealmAccess {
        List<String> roles; // Danh sách các vai trò trong realm
    }

    // Lớp ResourceAccess để ánh xạ thông tin truy cập vào tài nguyên
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class ResourceAccess {
        Map<String, ResourceRoles> resourceRoles; // Vai trò trong từng tài nguyên

        // Lớp ánh xạ vai trò trong tài nguyên
        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        @Builder
        @FieldDefaults(level = AccessLevel.PRIVATE)
        public static class ResourceRoles {
            List<String> roles; // Danh sách vai trò trong tài nguyên
        }
    }
}
