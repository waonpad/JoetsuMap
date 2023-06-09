package com.joetsumap.common.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static com.joetsumap.common.constant.ApiPathConst.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping(API_TEST_PREFIX)
public class TestController {
  @GetMapping(API_TEST_ALL)
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping(API_TEST_USER)
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public String userAccess() {
    return "User Content.";
  }

  @GetMapping(API_TEST_MOD)
  @PreAuthorize("hasRole('MODERATOR')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping(API_TEST_ADMIN)
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }
}
