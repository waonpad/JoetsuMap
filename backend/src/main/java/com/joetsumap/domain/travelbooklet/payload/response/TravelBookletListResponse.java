package com.joetsumap.domain.travelbooklet.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelBookletListResponse {
  
  private List<TravelBookletDTO> travelbooklets;
}
