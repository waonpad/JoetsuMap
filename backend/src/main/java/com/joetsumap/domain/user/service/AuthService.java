package com.joetsumap.domain.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.joetsumap.domain.user.payload.request.LoginRequest;
import com.joetsumap.domain.user.payload.request.RegisterRequest;
import com.joetsumap.domain.user.payload.response.JwtResponse;
import com.joetsumap.domain.user.payload.response.UserResponse;
import com.joetsumap.security.services.UserDetailsImpl;
import com.joetsumap.domain.user.service.logic.AuthLogic;

import jakarta.transaction.Transactional;

@Service
@Transactional(rollbackOn = Exception.class)
public class AuthService {

  @Autowired
  AuthLogic authLogic;
  
  public JwtResponse login(LoginRequest loginRequest) {
    return authLogic.login(loginRequest.getUsername(), loginRequest.getPassword());
  }

  public JwtResponse register(RegisterRequest registerRequest) {

    authLogic.existsUserCheck(registerRequest.getUsername(), registerRequest.getPassword());

    authLogic.createUser(registerRequest);

    return authLogic.login(registerRequest.getUsername(), registerRequest.getPassword());
  }

  public UserResponse getMe(UserDetailsImpl userDetails) {

    UserResponse userResponse = new UserResponse(userDetails.getUser());

    return userResponse;
  }
}
