package com.joetsumap.domain.passing.payload.response;

import java.util.List;

import com.joetsumap.domain.passing.entity.Passing;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class PassingListResponse {
  
  private List<Passing> passings;
}
