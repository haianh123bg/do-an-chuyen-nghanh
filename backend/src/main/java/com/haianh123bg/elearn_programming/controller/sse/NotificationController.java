package com.haianh123bg.elearn_programming.controller.sse;


import com.haianh123bg.elearn_programming.dto.response.ApiResponse;
import com.haianh123bg.elearn_programming.dto.response.NotificationResponse;
import com.haianh123bg.elearn_programming.service.JWTService;
import com.haianh123bg.elearn_programming.service.sse.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.annotation.security.PermitAll;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RestController
@RequestMapping("/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    private final JWTService jwtService;

    @Operation(summary = "Đăng ký kết nối SSE", description = "Đăng ký kết nối SSE để nhận thông báo")
    @PermitAll
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamNotifications(
            @RequestParam String token
    ) {
        String userId = jwtService.extractUsername(token);
        return notificationService.addEmitter(userId);
    }

    @Operation(summary = "Xem thêm thông báo", description = "Xem thêm thông báo bằng id của thông sớm")
    @PreAuthorize("isAuthenticated()")
    @GetMapping(value = "/{notification_id}/more")
    public ApiResponse<List<NotificationResponse>> moreNotifications(
            @PathVariable(value = "notification_id") Long notification_id
    ) {
        return ApiResponse.<List<NotificationResponse>>builder()
                .code(200)
                .result(notificationService.moreNotifications(notification_id))
                .build();
    }
}
