package com.haianh123bg.elearn_programming.service.sse;

import com.haianh123bg.elearn_programming.dto.response.NotificationResponse;
import com.haianh123bg.elearn_programming.entity.Notification;
import com.haianh123bg.elearn_programming.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;
    // Dùng ConcurrentHashMap để lưu trữ các kết nối SSE theo user ID
    private ConcurrentHashMap<String, SseEmitter> emitters = new ConcurrentHashMap<>();

    // Đăng ký kết nối SSE cho người dùng với userId
    public SseEmitter addEmitter(String userId) {
        SseEmitter emitter = new SseEmitter(60000L); // 60 giây timeout
        emitters.put(userId, emitter);

        // Lấy thông báo cũ từ database khi người dùng kết nối lần đầu tiên
        Sort sort = Sort.by(Sort.Direction.DESC, "createdAt");
        Pageable pageable = PageRequest.of(0, 8, sort);
        List<Notification> notifications = notificationRepository.getListNotificationWithPage(Integer.valueOf(userId), pageable).getContent();
        for (Notification notification : notifications) {
            try {
                emitter.send(notification.getContent());
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        }

        emitter.onCompletion(() -> emitters.remove(userId));  // Loại bỏ khi kết nối hoàn tất
        emitter.onTimeout(() -> emitters.remove(userId));     // Loại bỏ khi kết nối timeout
        return emitter;
    }

    // Gửi thông báo đến một người dùng cụ thể qua SSE
    public void sendNotificationToUser(String userId, String message) {
        SseEmitter emitter = emitters.get(userId);
        if (emitter != null) {
            try {
                emitter.send(message);
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        }
    }

    // Gửi thông báo tới tất cả người dùng
    public void sendNotificationToAll(String message) {
        for (SseEmitter emitter : emitters.values()) {
            try {
                emitter.send(message);
            } catch (Exception e) {
                emitter.completeWithError(e);
            }
        }
    }

    @Async
    public void sendNotificationAsync(String userId, String message) {
        // Gửi thông báo bất đồng bộ cho người dùng cụ thể
        sendNotificationToUser(userId, message);  // Gọi phương thức gửi thông báo tới một người dùng
    }

    @Async
    public void sendNotificationToAllAsync(String message) {
        sendNotificationToAll(message);
    }
}
