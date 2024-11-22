package com.haianh123bg.elearn_programming.controller.teacher;

import com.haianh123bg.elearn_programming.dto.request.ResourceRequest;
import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.ResourceResponse;
import com.haianh123bg.elearn_programming.exception.AppException;
import com.haianh123bg.elearn_programming.exception.ErrorCode;
import com.haianh123bg.elearn_programming.service.ResourceService;
import com.haianh123bg.elearn_programming.utils.MimeTypeUtils;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.ExampleObject;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Giáo viên: tài nguyên", description = "Quản lý tài nguyên của giáo viên...")
@RestController
@RequestMapping("/teacher/resource")
@RequiredArgsConstructor
public class TResourceController {
    private final ResourceService resourceService;

    @Operation(summary = "Upload tài nguyên", description = "Upload tài nguyên lên cloud")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1040", description = "Resource not found", content = @Content),
    })
    @PreAuthorize("isAuthenticated()")
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<ResourceResponse> uploadResource(
            @Valid @ModelAttribute ResourceRequest request,
            @RequestPart(value = "file", required = false) MultipartFile file
    ) {
        return ApiResponse.<ResourceResponse>builder()
                .code(200)
                .result(resourceService.uploadResource(request, file))
                .build();
    }

    @Operation(summary = "Xóa tài nguyên", description = "Xóa tài nguyên theo mã tài nguyên")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1000", description = "Bạn không có quyền truy cập", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1039", description = "Type item invalid", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1032", description = "Course not found", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
    })
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/{resourceId}")
    public ApiResponse<Void> deleteResource(
            @PathVariable Long resourceId
    ) {
        resourceService.deleteResource(resourceId);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa tài nguyên thành công")
                .build();
    }

    @Operation(summary = "Upload danh sách tài nguyên", description = "Upload danh sách tài nguyên lên cloud")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Thành công", content = @Content(
                    mediaType = "application/json",
                    examples = @ExampleObject(value = """
                            {
                                                "code": 200,
                                                "result": [
                                                    {
                                                        "id": 1,
                                                        "name": "Tài nguyên 1",
                                                        "url": "https://example.com/resource1.pdf",
                                                        "type": "PDF",
                                                        "tag": "education"
                                                    },
                                                    {
                                                        "id": 2,
                                                        "name": "Tài nguyên 2",
                                                        "url": "https://example.com/resource2.xlsx",
                                                        "type": "Excel",
                                                        "tag": "course"
                                                    }
                                                ]
                                            }
                            """)
            )
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1042", description = "File size exceeds the allowed limit", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1043", description = "Invalid file type", content = @Content),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1001", description = "You do not have permission", content = @Content),
    })
    @PreAuthorize("isAuthenticated()")
    @PostMapping(value = "/list", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ApiResponse<List<ResourceResponse>> uploadListResource(
            @Valid @ModelAttribute List<ResourceRequest> request,
            @RequestPart(value = "files", required = false) List<MultipartFile> files
    ) {
        // Validate the number of files
        if (files != null && files.size() > 5) {
            throw new AppException(ErrorCode.FILE_SIZE_EXCEEDED);
        }

        // Validate file MIME types
        List<String> allowedMimeTypes = MimeTypeUtils.getAllowedMimeType();

        if (files != null) {
            for (MultipartFile file : files) {
                String mimeType = file.getContentType();
                if (!allowedMimeTypes.contains(mimeType)) {
                    throw new AppException(ErrorCode.INVALID_FILE_TYPE);
                }
            }
        }

        return ApiResponse.<List<ResourceResponse>>builder()
                .code(200)
                .result(resourceService.uploadListResource(request, files))
                .build();
    }

    @Operation(summary = "Xóa danh sách tài nguyên", description = "Xóa danh sách tài nguyên theo mã tài nguyên")
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "200", description = "Xóa tài nguyên thành công"),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(responseCode = "1029", description = "Cloudflare delete error!", content = @Content),
    })
    @PreAuthorize("isAuthenticated()")
    @DeleteMapping("/list")
    public ApiResponse<Void> deleteListResource(
            @RequestBody List<Long> resourceIds
    ) {
        resourceService.deleteListResource(resourceIds);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("Xóa tài nguyên thành công")
                .build();
    }
}
