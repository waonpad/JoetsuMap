package com.joetsumap.common.type;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LatLng {

  @NotNull
  private Number lat;

  @NotNull
  private Number lng;
}

