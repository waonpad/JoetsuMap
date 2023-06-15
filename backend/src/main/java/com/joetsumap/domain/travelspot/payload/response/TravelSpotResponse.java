package com.joetsumap.domain.travelspot.payload.response;

import com.joetsumap.domain.travelspot.entity.TravelSpot;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelSpotResponse {
  
  private TravelSpot travelspot;
}
