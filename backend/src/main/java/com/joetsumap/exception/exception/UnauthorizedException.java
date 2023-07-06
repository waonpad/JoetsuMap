// package com.joetsumap.exception.exception;

// import org.springframework.http.HttpStatus;
// import org.springframework.web.bind.annotation.ResponseStatus;

// import com.joetsumap.exception.payload.response.EExpectedExceptionType;

// @ResponseStatus(HttpStatus.UNAUTHORIZED)
// public class UnauthorizedException extends ExpectedException {

//   private static final HttpStatus status = HttpStatus.UNAUTHORIZED;

//   private static final String message = "Unauthorized";

//   private static final EExpectedExceptionType type = EExpectedExceptionType.UNAUTHORIZED;

//   public UnauthorizedException(String message) {
//     super(status, message, type);
//   }

//   public UnauthorizedException() {
//     super(status, message, type);
//   }
// }