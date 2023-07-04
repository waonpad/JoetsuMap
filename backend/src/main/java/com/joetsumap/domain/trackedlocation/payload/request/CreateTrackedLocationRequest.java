package com.joetsumap.domain.trackedlocation.payload.request;

import com.joetsumap.common.type.LatLng;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CreateTrackedLocationRequest {
  
  @Valid
  @NotNull
  LatLng coords;
}
