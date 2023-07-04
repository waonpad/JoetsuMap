package com.joetsumap.domain.user.controller;

import jakarta.validation.Valid;

import static com.joetsumap.constant.ApiConst.*;
import static com.joetsumap.constant.ApiPathConst.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.domain.user.payload.request.LoginRequest;
import com.joetsumap.domain.user.payload.request.RegisterRequest;
import com.joetsumap.domain.user.payload.response.JwtResponse;
import com.joetsumap.domain.user.payload.response.UserResponse;
import com.joetsumap.security.services.UserDetailsImpl;
import com.joetsumap.domain.user.service.AuthService;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_AUTH_PREFIX)
public class AuthController {

  @Autowired
  AuthService authService;

  @PostMapping(API_AUTH_LOGIN)
  public JwtResponse login(@Valid @RequestBody LoginRequest loginRequest) {

    return authService.login(loginRequest);
  }

  @PostMapping(API_AUTH_REGISTER)
  public JwtResponse register(@Valid @RequestBody RegisterRequest registerRequest) {

    // 登録と同時にログインさせている
    return authService.register(registerRequest);
  }

  @GetMapping(API_AUTH_ME)
  public UserResponse getMe(@AuthenticationPrincipal UserDetailsImpl userDetails) {

    return authService.getMe(userDetails);
  }
}
