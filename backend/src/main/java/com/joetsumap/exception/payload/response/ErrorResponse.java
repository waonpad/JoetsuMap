package com.joetsumap.exception.payload.response;

import org.springframework.http.HttpStatusCode;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
public class ErrorResponse {

  private CustomError error;

  public ErrorResponse(HttpStatusCode code, String message, EExpectedExceptionType type) {
    this.error = new CustomError(code.value(), message, type);
  }

  @Data
  @AllArgsConstructor
  private class CustomError {

    private int code;

    private String message;

    private EExpectedExceptionType type;
  }
}