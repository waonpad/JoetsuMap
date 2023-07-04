package com.joetsumap.common.controller;

import static com.joetsumap.constant.ApiConst.*;
import static com.joetsumap.constant.ApiPathConst.*;
import static com.joetsumap.constant.AuthorizeConst.*;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_TEST_PREFIX)
public class TestController {
  @GetMapping(API_TEST_ALL)
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping(API_TEST_USER)
  @PreAuthorize(AUTHORIZED_USER)
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping(API_TEST_MOD)
  @PreAuthorize(AUTHORIZED_MODERATOR)
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping(API_TEST_ADMIN)
  @PreAuthorize(AUTHORIZED_ADMIN)
  public String adminAccess() {
    return "Admin Board.";
  }

  @GetMapping(API_TEST_CONNECTION)
  public String connection() {
    return "Connection Test.";
  }
}
