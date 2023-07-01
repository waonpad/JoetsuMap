package com.joetsumap.domain.travelspot.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelSpotResponse {
  
  private TravelSpotDTO travelSpot;
}
