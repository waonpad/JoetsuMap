package com.joetsumap.common.payload.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ToggleBookmarkResponse {
  
  private boolean isBookmarked;
}
