package com.joetsumap.domain.notification.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class SaveTokenRequest {
  
  @NotBlank
  String token;
}
