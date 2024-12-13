package com.haianh123bg.elearn_programming.repository;

import com.haianh123bg.elearn_programming.dto.response.NotificationResponse;
import com.haianh123bg.elearn_programming.entity.Notification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

    @Query("SELECT n FROM Notification n WHERE n.userId =:userId")
    Page<Notification> getListNotificationWithPage(Integer userId, Pageable pageable);

    @Query("SELECT new com.haianh123bg.elearn_programming.dto.response.NotificationResponse(n.content, n.isRead, n.createdAt) FROM Notification n WHERE n.userId = :userId AND n.notificationId < :notificationId")
    List<NotificationResponse> moreNotifications(Integer userId, Long notificationId, Pageable pageable);
}
