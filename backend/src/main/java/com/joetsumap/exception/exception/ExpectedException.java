package com.joetsumap.exception.exception;

import org.springframework.http.HttpStatusCode;

import com.joetsumap.exception.payload.response.EExpectedExceptionType;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = false)
public class ExpectedException extends RuntimeException {

  private HttpStatusCode statusCode;

  private String message;

  private EExpectedExceptionType type;

  public ExpectedException(HttpStatusCode statusCode, String message, EExpectedExceptionType type) {
    this.statusCode = statusCode;
    this.message = message;
    this.type = type;
  }
}
