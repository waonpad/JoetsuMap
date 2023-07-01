package com.joetsumap.domain.notification.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.joetsumap.domain.notification.entity.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

  List<Notification> findByRecipientId(Long id);
  Page<Notification> findByRecipientId(Long id, Pageable pageable);
}
