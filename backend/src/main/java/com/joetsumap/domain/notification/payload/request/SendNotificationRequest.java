package com.joetsumap.domain.notification.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SendNotificationRequest {
  
  @NotBlank
  String token;
}
