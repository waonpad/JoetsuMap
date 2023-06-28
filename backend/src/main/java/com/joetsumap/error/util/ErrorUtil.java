package com.joetsumap.error.util;

import com.joetsumap.error.constant.ExceptionMessageConst;
import com.joetsumap.security.services.UserDetailsImpl;

public class ErrorUtil {
  
  public static void checkAuthorWithException(UserDetailsImpl userDetails, Long id) {
    if (userDetails.getUser().getId() != id) {
      throw new RuntimeException(ExceptionMessageConst.AUTHORITY_ERROR);
    }
  }
}
