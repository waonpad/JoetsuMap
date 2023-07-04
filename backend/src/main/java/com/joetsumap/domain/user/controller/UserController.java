package com.joetsumap.domain.user.controller;

import jakarta.validation.Valid;

import static com.joetsumap.constant.ApiConst.*;
import static com.joetsumap.constant.ApiPathConst.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.domain.user.payload.request.UpdateProfileRequest;
import com.joetsumap.domain.user.payload.response.UserResponse;
import com.joetsumap.domain.user.service.UserService;
import com.joetsumap.security.services.UserDetailsImpl;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_USER_PREFIX)
public class UserController {

  @Autowired
  UserService userService;

  // // おそらく不要、テスト用
  // @GetMapping("")
  // public UserListResponse findAll() {

  //   return userService.findAll();
  // }

  @GetMapping("/{id}")
  public UserResponse findById(@PathVariable Long id) {

    return userService.findById(id);
  }

  @PatchMapping("/{id}")
  public UserResponse updateProfile(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id, @Valid @RequestBody UpdateProfileRequest updateRequest) {

    return userService.updateProfile(userDetails, updateRequest, id);
  }
}
