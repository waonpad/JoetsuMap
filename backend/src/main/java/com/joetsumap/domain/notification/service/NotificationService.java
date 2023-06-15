package com.joetsumap.domain.notification.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.notification.entity.Notification;
import com.joetsumap.domain.notification.payload.response.NotificationListResponse;
import com.joetsumap.domain.notification.repository.NotificationRepository;
import com.joetsumap.security.services.UserDetailsImpl;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class NotificationService {

  @Autowired
  NotificationRepository notificationRepository;

  public NotificationListResponse findMy(UserDetailsImpl userDetails) {

    // TODO: 本来はユーザーIDを元に取得
    List<Notification> notification = notificationRepository.findAll();

    return new NotificationListResponse(notification);
  }

  public void read(UserDetailsImpl userDetails, Long id) {

    Notification notification = notificationRepository.findById(id).get();

    // Update Entity Logic Here ...
  }

  public void readAll(UserDetailsImpl userDetails) {

    List<Notification> notification = notificationRepository.findAll();

    // Update Entity Logic Here ...

  }

  // public NotificationResponse findById(Long id) {

  //   Notification notification = notificationRepository.findById(id).get();

  //   return new NotificationResponse(notification);
  // }
}
