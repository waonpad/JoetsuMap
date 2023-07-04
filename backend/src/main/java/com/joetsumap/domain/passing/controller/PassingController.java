package com.joetsumap.domain.passing.controller;

import static com.joetsumap.constant.ApiConst.*;
import static com.joetsumap.constant.ApiPathConst.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.domain.passing.payload.response.PassingListResponse;
// import com.joetsumap.domain.passing.payload.response.PassingPageResponse;
import com.joetsumap.domain.passing.service.PassingService;
import com.joetsumap.security.services.UserDetailsImpl;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_PASSING_PREFIX)
public class PassingController {

  @Autowired
  PassingService passingService;

  @GetMapping("/my")
  public PassingListResponse findMy(@AuthenticationPrincipal UserDetailsImpl userDetails, @PageableDefault Pageable pageable) {

    return passingService.findMy(userDetails, pageable);
  }
}
