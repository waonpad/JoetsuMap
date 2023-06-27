package com.joetsumap.domain.modelcourse.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ModelCourseResponse {
  
  private ModelCourseDTO modelcourse;
}
