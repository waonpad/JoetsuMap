package com.joetsumap.common.type;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class LatLng {

  @NotNull
  private double lat;

  @NotNull
  private double lng;
}

