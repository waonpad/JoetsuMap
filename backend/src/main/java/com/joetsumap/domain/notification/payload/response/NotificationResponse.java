package com.joetsumap.domain.notification.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class NotificationResponse {
  
  private NotificationDTO notification;
}
