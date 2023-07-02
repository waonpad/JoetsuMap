package com.joetsumap.domain.travelspot.payload.response;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelSpotPageResponse {
  
  private Page<TravelSpotDTO> travelSpots;
}
