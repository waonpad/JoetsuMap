package com.joetsumap.exception.payload.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ErrorResponse {
  private CustomError error;

  public ErrorResponse(String code, String message) {
    this.error = new CustomError(code, message);
  }

  @Getter
  @Setter
  @AllArgsConstructor
  private class CustomError {
    private String code;
    private String message;
  }
}