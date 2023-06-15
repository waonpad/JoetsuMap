package com.joetsumap.domain.notification.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.domain.notification.payload.response.NotificationListResponse;
import com.joetsumap.domain.notification.service.NotificationService;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiConst.*;
import static com.joetsumap.common.constant.ApiPathConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_NOTIFICATION_PREFIX)
public class NotificationController {

  @Autowired
  NotificationService notificationService;

  @GetMapping("/my")
  public NotificationListResponse findMy(@AuthenticationPrincipal UserDetailsImpl userDetails) {

    return notificationService.findMy(userDetails);
  }

  @PatchMapping("/raad/{id}")
  public ResponseEntity<Void> read(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

    notificationService.read(userDetails, id);

    return ResponseEntity.ok().build();
  }

  @PatchMapping("/readall")
  public ResponseEntity<Void> readAll(@AuthenticationPrincipal UserDetailsImpl userDetails) {

    notificationService.readAll(userDetails);

    return ResponseEntity.ok().build();
  }
}
