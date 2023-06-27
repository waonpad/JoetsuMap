package com.joetsumap.domain.notification.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class NotificationListResponse {
  
  private List<NotificationDTO> notifications;
}
