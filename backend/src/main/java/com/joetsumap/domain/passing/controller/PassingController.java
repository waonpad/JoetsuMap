package com.joetsumap.domain.passing.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.domain.passing.payload.response.PassingListResponse;
import com.joetsumap.domain.passing.service.PassingService;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiConst.*;
import static com.joetsumap.common.constant.ApiPathConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_PASSING_PREFIX)
public class PassingController {

  @Autowired
  PassingService passingService;

  @GetMapping("/my")
  public PassingListResponse findMy(@AuthenticationPrincipal UserDetailsImpl userDetails) {

    return passingService.findMy(userDetails);
  }
}
