package com.joetsumap.domain.modelcourse.payload.response;

import com.joetsumap.domain.modelcourse.entity.ModelCourse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class ModelCourseResponse {
  
  private ModelCourse modelcourse;
}
