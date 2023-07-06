package com.joetsumap.exception.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.joetsumap.exception.payload.response.EExpectedExceptionType;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class TravelSpotInModelCourseNotFoundException extends ExpectedException {

  private static final HttpStatus status = HttpStatus.NOT_FOUND;

  private static final String message = "Not Found";

  private static final EExpectedExceptionType type = EExpectedExceptionType.TRAVELSPOT_IN_MODELCOURSE_NOT_FOUND;

  public TravelSpotInModelCourseNotFoundException(String message) {
    super(status, message, type);
  }

  public TravelSpotInModelCourseNotFoundException() {
    super(status, message, type);
  }
}