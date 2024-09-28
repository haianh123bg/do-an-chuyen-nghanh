package com.redon_agency.chatbot.dto.client.keycloak;

import java.util.List;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

/**
 * Lớp UserCreationParam đại diện cho các tham số cần thiết để tạo mới một người dùng trong Keycloak.
 *
 * Các thuộc tính:
 * - username: Tên đăng nhập của người dùng (bắt buộc).
 * - enabled: Trạng thái kích hoạt của người dùng, nếu true thì tài khoản được kích hoạt.
 * - email: Địa chỉ email của người dùng (tùy chọn).
 * - emailVerified: Đánh dấu xem email đã được xác thực hay chưa.
 * - firstName: Tên của người dùng.
 * - lastName: Họ của người dùng.
 * - credentials: Danh sách thông tin xác thực của người dùng, thường là mật khẩu hoặc các phương thức bảo mật khác.
 *
 * Lớp này được sử dụng khi gọi API để tạo một người dùng mới trong hệ thống Keycloak.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class UserCreationParam {
    String username;
    boolean enabled;
    String email;
    boolean emailVerified;
    String firstName;
    String lastName;
    List<Credential> credentials;
}
