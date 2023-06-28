package com.joetsumap.domain.travelbooklet.payload.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CreateTravelBookletRequest {
  
  @NotBlank
  private String title;

  @NotBlank
  private String text;

  @NotBlank
  private String photo;
}
