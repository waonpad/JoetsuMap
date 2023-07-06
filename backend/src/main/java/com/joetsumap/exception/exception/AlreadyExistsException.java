package com.joetsumap.exception.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.joetsumap.exception.payload.response.EExpectedExceptionType;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class AlreadyExistsException extends ExpectedException {

  private static final HttpStatus status = HttpStatus.BAD_REQUEST;

  private static final String message = "Already exists";

  private static final EExpectedExceptionType type = EExpectedExceptionType.ALREADY_EXISTS;

  public AlreadyExistsException(String message) {
    super(status, message, type);
  }

  public AlreadyExistsException() {
    super(status, message, type);
  }
}