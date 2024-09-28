package com.redon_agency.chatbot.dto.client.keycloak;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * Lớp Credential đại diện cho thông tin xác thực của người dùng trong Keycloak.
 *
 * Các thuộc tính:
 * - type: Loại thông tin xác thực, ví dụ "password" cho mật khẩu.
 * - value: Giá trị của thông tin xác thực, ví dụ mật khẩu hoặc token.
 * - temporary: Nếu true, thông tin xác thực này chỉ có giá trị tạm thời,
 *              người dùng sẽ được yêu cầu thay đổi sau khi đăng nhập lần đầu tiên.
 *
 * Lớp này thường được sử dụng trong quá trình tạo hoặc cập nhật thông tin người dùng trong Keycloak.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class Credential {
    String type;
    String value;
    boolean temporary;
}
