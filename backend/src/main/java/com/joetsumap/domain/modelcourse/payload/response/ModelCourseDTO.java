package com.joetsumap.domain.modelcourse.payload.response;

import java.time.LocalDateTime;
import java.util.List;

import com.joetsumap.domain.modelcourse.entity.ModelCourse;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotDTO;
import com.joetsumap.domain.user.payload.response.UserDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ModelCourseDTO {
  
  private Long id;

  private String title;

  private List<TravelSpotDTO> travelSpots;

  private UserDTO author;

  private List<UserDTO> bookmarkedUsers;

  private LocalDateTime createdAt;

  private LocalDateTime updatedAt;

  public ModelCourseDTO(ModelCourse modelCourse, List<TravelSpotDTO> travelSpots, UserDTO author, List<UserDTO> bookmarkedUsers) {
    this.id = modelCourse.getId();
    this.title = modelCourse.getTitle();
    this.travelSpots = travelSpots;
    this.author = author;
    this.bookmarkedUsers = bookmarkedUsers;
    this.createdAt = modelCourse.getCreatedAt();
    this.updatedAt = modelCourse.getUpdatedAt();
  }

  public ModelCourseDTO(ModelCourse modelCourse) {
    this(modelCourse, null, null, null);
  }
}
