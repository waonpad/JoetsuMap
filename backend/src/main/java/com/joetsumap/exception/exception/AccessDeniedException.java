package com.joetsumap.exception.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.joetsumap.exception.payload.response.EExpectedExceptionType;

@ResponseStatus(HttpStatus.FORBIDDEN)
public class AccessDeniedException extends ExpectedException {

  private static final HttpStatus status = HttpStatus.FORBIDDEN;

  private static final String message = "Access Denied";

  private static final EExpectedExceptionType type = EExpectedExceptionType.ACCESS_DENIED;

  public AccessDeniedException(String message) {
    super(status, message, type);
  }

  public AccessDeniedException() {
    super(status, message, type);
  }
}