package com.joetsumap.exception.util;

import com.joetsumap.exception.constant.ExceptionMessageConst;
import com.joetsumap.security.services.UserDetailsImpl;

public class ExceptionUtil {
  
  public static void checkAuthorWithException(UserDetailsImpl userDetails, Long id) {
    if (userDetails.getUser().getId() != id) {
      throw new RuntimeException(ExceptionMessageConst.AUTHORITY_ERROR);
    }
  }
}
