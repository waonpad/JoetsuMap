package com.joetsumap.domain.passing.payload.response;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class PassingPageResponse {
  
  private Page<PassingDTO> passings;
}
