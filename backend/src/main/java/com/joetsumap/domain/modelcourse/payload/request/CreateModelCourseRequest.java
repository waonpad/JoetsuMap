package com.joetsumap.domain.modelcourse.payload.request;

import java.util.List;

import org.hibernate.validator.constraints.UniqueElements;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class CreateModelCourseRequest {
  
  @NotBlank
  private String title;

  @NotNull
  @Size(min = 2, max = 10)
  @UniqueElements
  private List<Long> travelSpotIds;
}
