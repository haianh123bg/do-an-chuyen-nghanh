package com.haianh123bg.elearn_programming.service.client.drive;

import com.google.api.client.http.FileContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.services.drive.model.FileList;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FilesAPI {
    private final Drive driveService;

    // 1. Tạo tệp mới trên Google Drive
    public String createFile(String fileName, String filePath, String mimeType) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(fileName);

        java.io.File file = new java.io.File(filePath);
        FileContent mediaContent = new FileContent(mimeType, file);

        File uploadedFile = driveService.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();
        return uploadedFile.getId();
    }

    // 2. Lấy thông tin chi tiết của tệp
    public File getFile(String fileId) throws IOException {
        return driveService.files().get(fileId).setFields("id, name, mimeType, size").execute();
    }

    // 3. Liệt kê các tệp và thư mục trong Google Drive
    public List<File> listFiles() throws IOException {
        FileList result = driveService.files().list()
                .setFields("files(id, name)")
                .execute();
        return result.getFiles();
    }

    // 4. Cập nhật nội dung hoặc metadata của tệp
    public void updateFile(String fileId, String newFilePath, String mimeType) throws IOException {
        File fileMetadata = new File();
        java.io.File file = new java.io.File(newFilePath);
        FileContent mediaContent = new FileContent(mimeType, file);

        driveService.files().update(fileId, fileMetadata, mediaContent).execute();
    }

    // 5. Xóa tệp khỏi Google Drive
    public void deleteFile(String fileId) throws IOException {
        driveService.files().delete(fileId).execute();
    }

    // 6. Tạo bản sao của một tệp
    public String copyFile(String fileId, String newFileName) throws IOException {
        File fileMetadata = new File();
        fileMetadata.setName(newFileName);

        File copiedFile = driveService.files().copy(fileId, fileMetadata).execute();
        return copiedFile.getId();
    }

    // 7. Xuất tệp Google Docs sang định dạng khác
    public void exportFile(String fileId, String mimeType, String destinationPath) throws IOException {
        OutputStream outputStream = new FileOutputStream(destinationPath);
        driveService.files().export(fileId, mimeType).executeMediaAndDownloadTo(outputStream);
        outputStream.close();
    }

    // 8. Tải tệp về từ Google Drive
    public void downloadFile(String fileId, String destinationPath) throws IOException {
        OutputStream outputStream = new FileOutputStream(destinationPath);
        driveService.files().get(fileId).executeMediaAndDownloadTo(outputStream);
        outputStream.close();
    }

    // 9. Tạo các ID duy nhất cho tệp
    public List<String> generateIds(int count) throws IOException {
        return driveService.files().generateIds().setCount(count).execute().getIds();
    }

    // 10. Sử dụng query để lọc ra các tệp chia sẻ với bạn
    public List<File> listSharedFiles() throws IOException {
        FileList result = driveService.files().list()
                .setQ("sharedWithMe")
                .setPageSize(10)  // Số lượng tệp muốn lấy
                .setFields("nextPageToken, files(id, name, owners, sharedWithMeTime)")
                .execute();
        return result.getFiles();
    }
}
