package com.joetsumap.domain.user.controller;

import java.util.ArrayList;
import java.util.List;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.common.payload.response.MessageResponse;
import com.joetsumap.domain.role.entity.ERole;
import com.joetsumap.domain.role.entity.Role;
import com.joetsumap.domain.role.repository.RoleRepository;
import com.joetsumap.domain.user.entity.User;
import com.joetsumap.domain.user.payload.request.LoginRequest;
import com.joetsumap.domain.user.payload.request.RegisterRequest;
import com.joetsumap.domain.user.payload.response.JwtResponse;
import com.joetsumap.domain.user.payload.response.UserResponse;
import com.joetsumap.domain.user.repository.UserRepository;
import com.joetsumap.security.jwt.JwtUtils;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiPathConst.*;
import com.joetsumap.domain.user.service.AuthService;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(API_AUTH_PREFIX)
public class AuthController {

  @Autowired
  AuthService authService;

  @PostMapping(API_AUTH_LOGIN)
  public ResponseEntity<?> login(@Valid @RequestBody LoginRequest loginRequest) {
    JwtResponse jwtResponse = authService.login(loginRequest);

    return ResponseEntity.ok(jwtResponse);
  }

  @PostMapping(API_AUTH_REGISTER)
  public ResponseEntity<?> register(@Valid @RequestBody RegisterRequest registerRequest) {
    JwtResponse jwtResponse = authService.register(registerRequest);

    return ResponseEntity.ok(jwtResponse);
  }

  @GetMapping(API_AUTH_ME)
  public ResponseEntity<?> getMe(@AuthenticationPrincipal UserDetailsImpl userDetails) {

    UserResponse userResponse = new UserResponse(userDetails.getUser());

    return ResponseEntity.ok(userResponse);
  }
}
