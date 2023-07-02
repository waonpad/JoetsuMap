package com.joetsumap.domain.trackedlocation.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TrackedLocationListResponse {
  
  private List<TrackedLocationDTO> trackedLocations;
}
