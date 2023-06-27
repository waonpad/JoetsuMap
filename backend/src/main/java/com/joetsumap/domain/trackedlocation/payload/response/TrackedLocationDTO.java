package com.joetsumap.domain.trackedlocation.payload.response;

import java.time.LocalDateTime;

import com.joetsumap.common.type.LatLng;
import com.joetsumap.domain.trackedlocation.entity.TrackedLocation;
import com.joetsumap.domain.user.payload.response.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TrackedLocationDTO {
  
  private Long id;

  private LatLng coords;

  private UserDTO user;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  public TrackedLocationDTO(TrackedLocation trackedLocation, UserDTO user) {
    this.id = trackedLocation.getId();
    this.coords = new LatLng(trackedLocation.getLatitude(), trackedLocation.getLongitude());
    this.user = user;
    this.createdAt = trackedLocation.getCreatedAt();
    this.updatedAt = trackedLocation.getUpdatedAt();
  }

  public TrackedLocationDTO(TrackedLocation trackedLocation) {
    this(trackedLocation, null);
  }
}
