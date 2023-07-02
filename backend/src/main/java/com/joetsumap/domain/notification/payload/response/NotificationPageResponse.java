package com.joetsumap.domain.notification.payload.response;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class NotificationPageResponse {
  
  private Page<NotificationDTO> notifications;
}
