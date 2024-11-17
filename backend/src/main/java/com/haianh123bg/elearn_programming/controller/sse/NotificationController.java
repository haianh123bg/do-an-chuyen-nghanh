package com.haianh123bg.elearn_programming.controller.sse;

import com.haianh123bg.elearn_programming.service.JWTService;
import com.haianh123bg.elearn_programming.service.sse.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService notificationService;
    private final JWTService jwtService;

    // Đăng ký kết nối SSE
    @GetMapping(value = "/stream", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamNotifications(
            @RequestParam String token
    ) {
        String userId = jwtService.extractUsername(token);
        return notificationService.addEmitter(userId);
    }
}
