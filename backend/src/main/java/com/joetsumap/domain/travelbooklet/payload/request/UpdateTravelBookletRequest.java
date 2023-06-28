package com.joetsumap.domain.travelbooklet.payload.request;

import io.micrometer.common.lang.Nullable;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class UpdateTravelBookletRequest {
  
  @NotBlank
  private String title;

  @NotBlank
  private String text;

  @Nullable
  private String photo;
}
