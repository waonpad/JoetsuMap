package com.joetsumap.domain.travelspot.payload.response;

import java.time.LocalDateTime;
// import java.util.ArrayList;
import java.util.List;

import com.joetsumap.common.type.LatLng;
// import com.joetsumap.domain.modelcourse.payload.response.ModelCourseDTO;
import com.joetsumap.domain.travelspot.entity.ETravelSpotType;
import com.joetsumap.domain.travelspot.entity.TravelSpot;
import com.joetsumap.domain.user.payload.response.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelSpotDTO {
  
  private Long id;

  private String name;

  private String address;

  private String tel;

  private List<ETravelSpotType> types;

  private String icon;

  private String photo;

  private LatLng coords;

  // private List<ModelCourseDTO> modelCourses = new ArrayList<>();

  private UserDTO author;

  private List<UserDTO> bookmarkedUsers;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  public TravelSpotDTO(TravelSpot travelSpot, UserDTO author, List<UserDTO> bookmarkedUsers) {
    this.id = travelSpot.getId();
    this.name = travelSpot.getName();
    this.address = travelSpot.getAddress();
    this.tel = travelSpot.getTel();
    this.types = travelSpot.getTypes().stream().map(type -> type.getName()).toList();
    this.icon = travelSpot.getIcon();
    this.photo = travelSpot.getPhoto();
    this.coords = new LatLng(travelSpot.getLatitude(), travelSpot.getLongitude());
    // this.modelCourses = modelCourses;
    this.author = author;
    this.bookmarkedUsers = bookmarkedUsers;
    this.createdAt = travelSpot.getCreatedAt();
    this.updatedAt = travelSpot.getUpdatedAt();
  }

  public TravelSpotDTO(TravelSpot travelSpot) {
    this(travelSpot, null, null);
  }
}
