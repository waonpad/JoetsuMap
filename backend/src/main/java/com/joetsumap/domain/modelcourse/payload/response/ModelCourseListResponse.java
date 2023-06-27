package com.joetsumap.domain.modelcourse.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ModelCourseListResponse {
  
  private List<ModelCourseDTO> modelcourses;
}
