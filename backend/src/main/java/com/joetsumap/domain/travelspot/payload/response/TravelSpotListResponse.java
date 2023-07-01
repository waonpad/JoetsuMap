package com.joetsumap.domain.travelspot.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelSpotListResponse {
  
  private List<TravelSpotDTO> travelSpots;
}
