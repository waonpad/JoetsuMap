package com.joetsumap.exception.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.joetsumap.exception.payload.response.EExpectedExceptionType;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class FileUploadException extends ExpectedException {
  
  private static final HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;

  private static final String message = "File Upload Failed";

  private static final EExpectedExceptionType type = EExpectedExceptionType.FILE_UPLOAD_ERROR;

  public FileUploadException(String message) {
    super(status, message, type);
  }

  public FileUploadException() {
    super(status, message, type);
  }
}
