package com.haianh123bg.elearn_programming.service.client.drive;

import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.Permission;
import com.google.api.services.drive.model.PermissionList;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class PermissionsAPI {

    private final Drive driveService;

    @Autowired
    public PermissionsAPI(Drive driveService) {
        this.driveService = driveService;
    }

    /**
     * 1. Tạo quyền truy cập cho tệp/thư mục
     *
     * @param fileId     ID của tệp hoặc thư mục
     * @param email      Địa chỉ email của người dùng hoặc nhóm
     * @param role       Vai trò (owner, writer, reader)
     * @param type       Loại quyền (user, group, domain, anyone)
     * @return ID của quyền truy cập vừa tạo
     * @throws IOException
     */
    public String createPermission(String fileId, String email, String role, String type) throws IOException {
        Permission permission = new Permission()
                .setType(type)
                .setRole(role)
                .setEmailAddress(email);

        Permission createdPermission = driveService.permissions()
                .create(fileId, permission)
                .setSendNotificationEmail(false) // Không gửi email thông báo
                .execute();

        return createdPermission.getId();
    }

    /**
     * 2. Lấy thông tin quyền truy cập
     *
     * @param fileId         ID của tệp hoặc thư mục
     * @param permissionId   ID của quyền truy cập
     * @return Thông tin quyền truy cập
     * @throws IOException
     */
    public Permission getPermission(String fileId, String permissionId) throws IOException {
        return driveService.permissions().get(fileId, permissionId).execute();
    }

    /**
     * 3. Liệt kê tất cả quyền truy cập của tệp/thư mục
     *
     * @param fileId ID của tệp hoặc thư mục
     * @return Danh sách quyền truy cập
     * @throws IOException
     */
    public List<Permission> listPermissions(String fileId) throws IOException {
        PermissionList permissions = driveService.permissions().list(fileId).execute();
        return permissions.getPermissions();
    }

    /**
     * 4. Cập nhật quyền truy cập
     *
     * @param fileId         ID của tệp hoặc thư mục
     * @param permissionId   ID của quyền truy cập
     * @param newRole        Vai trò mới (owner, writer, reader)
     * @return Thông tin quyền truy cập sau khi cập nhật
     * @throws IOException
     */
    public Permission updatePermission(String fileId, String permissionId, String newRole) throws IOException {
        Permission permission = new Permission().setRole(newRole);
        return driveService.permissions().update(fileId, permissionId, permission).execute();
    }

    /**
     * 5. Xóa quyền truy cập
     *
     * @param fileId         ID của tệp hoặc thư mục
     * @param permissionId   ID của quyền truy cập cần xóa
     * @throws IOException
     */
    public void deletePermission(String fileId, String permissionId) throws IOException {
        driveService.permissions().delete(fileId, permissionId).execute();
    }
}