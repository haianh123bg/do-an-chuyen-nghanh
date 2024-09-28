package com.redon_agency.chatbot.dto.client.keycloak;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * Lớp TokenExchangeResponse đại diện cho phản hồi từ Keycloak sau khi trao đổi token thành công.
 *
 * Các thuộc tính:
 * - accessToken: Token truy cập (access token) được trả về từ Keycloak.
 * - expiresIn: Thời gian tồn tại của access token (được tính bằng giây).
 * - refreshExpiresIn: Thời gian tồn tại của refresh token (được tính bằng giây).
 * - tokenType: Loại token, ví dụ "Bearer".
 * - idToken: Token định danh (ID token) được trả về từ Keycloak (thường dùng trong OpenID Connect).
 * - scope: Phạm vi của token, ví dụ như "openid", "profile".
 *
 * Lớp này sử dụng Jackson để ánh xạ dữ liệu JSON với chiến lược đặt tên là SnakeCase (sử dụng dấu gạch dưới
 * giữa các từ thay vì camelCase).
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public class TokenExchangeResponse {
    String accessToken;
    String expiresIn;
    String refreshExpiresIn;
    String tokenType;
    String idToken;
    String scope;
}
