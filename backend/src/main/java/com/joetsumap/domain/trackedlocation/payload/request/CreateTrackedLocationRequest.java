package com.joetsumap.domain.trackedlocation.payload.request;

import com.joetsumap.common.type.LatLng;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTrackedLocationRequest {
  
  @NotNull
  LatLng coords;
}
