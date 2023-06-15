package com.joetsumap.domain.trackedlocation.payload.response;

import java.util.List;

import com.joetsumap.domain.trackedlocation.entity.TrackedLocation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TrackedLocationListResponse {
  
  private List<TrackedLocation> trackedlocations;
}
