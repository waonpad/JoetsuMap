package com.joetsumap.domain.travelbooklet.payload.response;

import org.springframework.data.domain.Page;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelBookletPageResponse {
  
  private Page<TravelBookletDTO> travelBooklets;
}
