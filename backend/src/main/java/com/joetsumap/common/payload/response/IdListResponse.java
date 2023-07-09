package com.joetsumap.common.payload.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class IdListResponse {
  
  private List<Long> ids;
}
