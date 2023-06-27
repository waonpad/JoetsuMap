package com.joetsumap.domain.user.payload.response;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.joetsumap.domain.modelcourse.payload.response.ModelCourseDTO;
import com.joetsumap.domain.notification.payload.response.NotificationDTO;
import com.joetsumap.domain.passing.payload.response.PassingDTO;
import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.trackedlocation.payload.response.TrackedLocationDTO;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletDTO;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotDTO;
import com.joetsumap.domain.user.entity.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class UserDTO {
  
  private Long id;

  private String username;

  private String email;

  private String icon;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  private List<ERole> roles;

  private List<TravelBookletDTO> travelBooklets;

  private List<TravelSpotDTO> travelSpots;

  private List<ModelCourseDTO> modelCourses;

  private List<TrackedLocationDTO> trackedLocations;

  private List<NotificationDTO> notifications;

  private List<PassingDTO> passings;

  private List<ModelCourseDTO> bookmarkedModelCourses;

  private List<TravelSpotDTO> bookmarkedTravelSpots;

  public UserDTO(
    User user,
    List<TravelBookletDTO> travelBooklets,
    List<TravelSpotDTO> travelSpots,
    List<ModelCourseDTO> modelCourses,
    List<TrackedLocationDTO> trackedLocations,
    List<NotificationDTO> notifications,
    List<PassingDTO> passings,
    List<ModelCourseDTO> bookmarkedModelCourses,
    List<TravelSpotDTO> bookmarkedTravelSpots
  ) {
    this.id = user.getId();
    this.username = user.getUsername();
    this.email = user.getEmail();
    this.icon = user.getIcon();
    this.createdAt = user.getCreatedAt();
    this.updatedAt = user.getUpdatedAt();
    this.roles = user.getRoles().stream().map(role -> role.getName()).toList();
    this.travelBooklets = travelBooklets;
    this.travelSpots = travelSpots;
    this.modelCourses = modelCourses;
    this.trackedLocations = trackedLocations;
    this.notifications = notifications;
    this.passings = passings;
    this.bookmarkedModelCourses = bookmarkedModelCourses;
    this.bookmarkedTravelSpots = bookmarkedTravelSpots;
  }

  public UserDTO(User user) {
    this(user, null, null, null, null, null, null, null, null);
  }
}
