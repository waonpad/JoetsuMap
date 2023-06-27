package com.joetsumap.domain.travelbooklet.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@AllArgsConstructor
@EqualsAndHashCode(callSuper=false)
public class TravelBookletResponse {
  
  private TravelBookletDTO travelbooklet;
}
