package com.joetsumap.exception.util;

import com.joetsumap.exception.exception.AccessDeniedException;
import com.joetsumap.security.services.UserDetailsImpl;

public class ExceptionUtil {
  
  public static void checkEqualsIdWithException(UserDetailsImpl userDetails, Long id) {
    if (userDetails.getUser().getId() != id) {
      throw new AccessDeniedException();
    }
  }
}
