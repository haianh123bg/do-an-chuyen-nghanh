package com.haianh123bg.elearn_programming.controller.teacher;

import com.haianh123bg.elearn_programming.dto.request.ResourceRequest;
import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.ResourceResponse;
import com.haianh123bg.elearn_programming.service.ResourceService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
}
