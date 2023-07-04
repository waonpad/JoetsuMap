package com.joetsumap.exception;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.ConversionNotSupportedException;
import org.springframework.beans.TypeMismatchException;
import org.springframework.http.HttpHeaders;
import static org.springframework.http.HttpStatus.*;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.http.converter.HttpMessageNotWritableException;
import org.springframework.lang.Nullable;
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

		Map<String, Object> body = new HashMap<>();
    Map<String, Object> errorBody = new HashMap<>();
    errorBody.put("validation", errors);
    errorBody.put("message", "Validation error");
    errorBody.put("status", BAD_REQUEST.value());
    body.put("error", errorBody);

		return new ResponseEntity<Object>(body, BAD_REQUEST);
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
    ErrorResponse re = new ErrorResponse(String.valueOf(status.value()), ex.getMessage());
    return super.handleExceptionInternal(ex, re, headers, status, request);
  }

  // ResponseStatusException 例外を処理したい場合
  // レスポンスフォーマットをカスタマイズしたい場合は、こちらを定義してレスポンスを実装する
  @ExceptionHandler(ResponseStatusException.class)
  protected ResponseEntity<Object> handleResponseStatus(ResponseStatusException ex, WebRequest request) {
      ErrorResponse re = new ErrorResponse(String.valueOf(ex.getStatusCode().value()), ex.getMessage());
    return this.handleExceptionInternal(ex, null, new HttpHeaders(), ex.getStatusCode(), request);
  }

  // 未処理の例外があった場合を想定して定義
  // ここではその他サーバエラーとして 500 を返すのがよさそう
  @ExceptionHandler(Exception.class)
  @ResponseStatus(INTERNAL_SERVER_ERROR)
  public ErrorResponse handleGeneralException(Exception exception, WebRequest request) {
    return new ErrorResponse(String.valueOf(INTERNAL_SERVER_ERROR), "Unexpected Error");
  }
}