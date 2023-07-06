package com.joetsumap.exception;

import java.util.HashMap;
import java.util.Map;
// import java.util.NoSuchElementException;

import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import static org.springframework.http.HttpStatus.*;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.lang.Nullable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.LockedException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.ErrorResponseException;
import org.springframework.web.HttpMediaTypeNotAcceptableException;
import org.springframework.web.HttpMediaTypeNotSupportedException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingPathVariableException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.ServletRequestBindingException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.context.request.async.AsyncRequestTimeoutException;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.NoHandlerFoundException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.joetsumap.exception.exception.ExpectedException;
import com.joetsumap.exception.payload.response.EExpectedExceptionType;
// import com.joetsumap.exception.exception.MyException;
import com.joetsumap.exception.payload.response.ErrorResponse;

// https://kasyalog.site/blog/spring-boot-exception/#toc14

@RestControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

  // カスタム例外を処理したい場合
  // 同様の記述が @RestController にもある場合は、@RestController での実装が優先される。
  // 例外と HTTPステータスがセットな場合はこれらを定義していく 
  // @ExceptionHandler(MyException.class)
  // @ResponseStatus(BAD_REQUEST)
  // public ErrorResponse handleMyException(MyException exception) {
  //   return new ErrorResponse("200", "HelloControllerAdvice - @ExceptionHandler: MyException");
  // }

  // バリデーションエラー
	@Override
	protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
		
		Map<String, String> errors = new HashMap<>();
		ex.getBindingResult().getAllErrors().forEach((error) ->{
			
			String fieldName = ((FieldError) error).getField();
			String message = error.getDefaultMessage();
			errors.put(fieldName, message);
		});

    // UNPROCESSABLE_ENTITYの方がバリデーションエラーとして受け取りやすいか？
    // 元は BAD_REQUEST
    HttpStatusCode customStatus = UNPROCESSABLE_ENTITY;

		Map<String, Object> body = new HashMap<>();
    Map<String, Object> errorBody = new HashMap<>();
    errorBody.put("validation", errors);
    errorBody.put("message", "Validation error");
    errorBody.put("status", customStatus.value());
    errorBody.put("type", EExpectedExceptionType.VALIDATION_ERROR);
    body.put("error", errorBody);

		return new ResponseEntity<Object>(body, customStatus);
	}

  // フロントエンドでtypeを受け取ることで独自の処理に繋げる必要のある例外を処理したい場合
  @ExceptionHandler(ExpectedException.class)
  protected ResponseEntity<ErrorResponse> handleExpectedException(ExpectedException ex) {
    ErrorResponse errorResponse = new ErrorResponse(ex.getStatusCode(), ex.getMessage(), ex.getType());
    return new ResponseEntity<ErrorResponse>(errorResponse, ex.getStatusCode());
  }

  // // findById(id).get() で対象データがない場合等に発生する例外
  // @ExceptionHandler(NoSuchElementException.class)
  // public ErrorResponse handleNoSuchElementException(NoSuchElementException ex, WebRequest request) {
  //   return new ErrorResponse(NOT_FOUND, "No such element", null);
  // }

  // 認証失敗時の例外
  @ExceptionHandler(BadCredentialsException.class)
  public ResponseEntity<ErrorResponse> handleBadCredentialsException(BadCredentialsException ex, WebRequest request) {
    ErrorResponse errorResponse = new ErrorResponse(UNAUTHORIZED, "Bad credentials", EExpectedExceptionType.BAD_CREDENTIALS);
    return new ResponseEntity<ErrorResponse>(errorResponse, UNAUTHORIZED);
  }

  // ユーザーが無効の場合の例外
  @ExceptionHandler(DisabledException.class)
  public ResponseEntity<ErrorResponse> handleDisabledException(DisabledException ex, WebRequest request) {
    ErrorResponse errorResponse = new ErrorResponse(UNAUTHORIZED, "Disabled", EExpectedExceptionType.USER_DISABLED);
    return new ResponseEntity<ErrorResponse>(errorResponse, UNAUTHORIZED);
  }

  // ユーザーがロックされている場合の例外
  @ExceptionHandler(LockedException.class)
  public ResponseEntity<ErrorResponse> handleLockedException(LockedException ex, WebRequest request) {
    ErrorResponse errorResponse = new ErrorResponse(UNAUTHORIZED, "Locked", EExpectedExceptionType.USER_LOCKED);
    return new ResponseEntity<ErrorResponse>(errorResponse, UNAUTHORIZED);
  }

  @ExceptionHandler(AccessDeniedException.class)
  public ResponseEntity<ErrorResponse> handleAccessDeniedException(AccessDeniedException ex, WebRequest request) {
    ErrorResponse errorResponse = new ErrorResponse(FORBIDDEN, "Access denied", EExpectedExceptionType.ACCESS_DENIED);
    return new ResponseEntity<ErrorResponse>(errorResponse, FORBIDDEN);
  }

  @Override
  public ResponseEntity<Object> handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, METHOD_NOT_ALLOWED, request);
  }

  @Override
  public ResponseEntity<Object> handleHttpMediaTypeNotSupported(HttpMediaTypeNotSupportedException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, UNSUPPORTED_MEDIA_TYPE, request);
  }

  @Override
  public ResponseEntity<Object> handleHttpMediaTypeNotAcceptable(HttpMediaTypeNotAcceptableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, NOT_ACCEPTABLE, request);
  }

  @Override
  public ResponseEntity<Object> handleMissingPathVariable(MissingPathVariableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, INTERNAL_SERVER_ERROR, request);
  }

  @Override
  public ResponseEntity<Object> handleMissingServletRequestParameter(MissingServletRequestParameterException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, BAD_REQUEST, request);
  }

  @Override
  public ResponseEntity<Object> handleMissingServletRequestPart(MissingServletRequestPartException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, BAD_REQUEST, request);
  }

  @Override
  public ResponseEntity<Object> handleServletRequestBindingException(ServletRequestBindingException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, BAD_REQUEST, request);
  }

  @Override
  public ResponseEntity<Object> handleNoHandlerFoundException(NoHandlerFoundException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, NOT_FOUND, request);
  }

  @Override
  public ResponseEntity<Object> handleAsyncRequestTimeoutException(AsyncRequestTimeoutException ex, HttpHeaders headers, HttpStatusCode status, WebRequest webRequest) {
    return this.handleExceptionInternal(ex, "", headers, SERVICE_UNAVAILABLE, webRequest);
  }

  @Override
  public ResponseEntity<Object> handleErrorResponseException(ErrorResponseException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, INTERNAL_SERVER_ERROR, request);
  }

  @Override
  public ResponseEntity<Object> handleConversionNotSupported(ConversionNotSupportedException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, INTERNAL_SERVER_ERROR, request);
  }

  @Override
  public ResponseEntity<Object> handleTypeMismatch(TypeMismatchException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, BAD_REQUEST, request);
  }

  @Override
  public ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, BAD_REQUEST, request);
  }

  @Override
  public ResponseEntity<Object> handleHttpMessageNotWritable(HttpMessageNotWritableException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, INTERNAL_SERVER_ERROR, request);
  }

  @Override
  public ResponseEntity<Object> handleBindException(BindException ex, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    return this.handleExceptionInternal(ex, "", headers, BAD_REQUEST, request);
  }

  // DefaultHandlerExceptionResolver でサポートされている例外に対する処理の共通処理部
  // レスポンスフォーマットをカスタマイズしたい場合は、こちらをオーバライドする
  @Override
  protected ResponseEntity<Object> handleExceptionInternal(
          Exception ex, @Nullable Object body, HttpHeaders headers, HttpStatusCode status, WebRequest request) {
    ErrorResponse re = new ErrorResponse(status, ex.getMessage(), null);
    return super.handleExceptionInternal(ex, re, headers, status, request);
  }

  // ResponseStatusException 例外を処理したい場合
  // レスポンスフォーマットをカスタマイズしたい場合は、こちらを定義してレスポンスを実装する
  @ExceptionHandler(ResponseStatusException.class)
  protected ResponseEntity<Object> handleResponseStatus(ResponseStatusException ex, WebRequest request) {
    ErrorResponse re = new ErrorResponse(ex.getStatusCode(), ex.getMessage(), null);
    return this.handleExceptionInternal(ex, re, new HttpHeaders(), ex.getStatusCode(), request);
  }

  // 未処理の例外があった場合を想定して定義
  // ここではその他サーバエラーとして 500 を返すのがよさそう
  @ExceptionHandler(Exception.class)
  @ResponseStatus(INTERNAL_SERVER_ERROR)
  public ErrorResponse handleGeneralException(Exception exception, WebRequest request) {
    
    return new ErrorResponse(INTERNAL_SERVER_ERROR, "Unexpected Error", null);
  }
}