package com.redon_agency.chatbot.dto.client.keycloak;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * Lớp TokenExchangeParam chứa các thông tin cần thiết cho việc trao đổi token trong Keycloak.
 *
 * Các thuộc tính:
 * - grant_type: Loại grant (cấp phép) sử dụng để trao đổi token, ví dụ "password" hoặc "client_credentials".
 * - client_id: ID của ứng dụng client trong Keycloak.
 * - client_secret: Secret của ứng dụng client trong Keycloak để xác thực.
 * - scope: Phạm vi yêu cầu trong quá trình trao đổi token, ví dụ "openid" để yêu cầu thông tin người dùng.
 * - username: Tên đăng nhập của người dùng (chỉ sử dụng với grant_type "password").
 * - password: Mật khẩu của người dùng (chỉ sử dụng với grant_type "password").
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TokenExchangeParam {
    String grant_type;
    String client_id;
    String client_secret;
    String scope;
    String username;
    String password;
}
