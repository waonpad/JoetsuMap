package com.joetsumap.domain.notification.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.notification.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
}
