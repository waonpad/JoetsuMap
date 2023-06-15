package com.joetsumap.domain.trackedlocation.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.domain.trackedlocation.payload.request.CreateTrackedLocationRequest;
import com.joetsumap.domain.trackedlocation.payload.response.TrackedLocationListResponse;
import com.joetsumap.domain.trackedlocation.service.TrackedLocationService;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiConst.*;
import static com.joetsumap.common.constant.ApiPathConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_TRACKED_LOCATION_PREFIX)
public class TrackedLocationController {

  @Autowired
  TrackedLocationService trackedlocationService;

  @GetMapping("/my")
  public TrackedLocationListResponse findMy(@AuthenticationPrincipal UserDetailsImpl userDetails) {

    return trackedlocationService.findMy(userDetails);
  }

  @PostMapping("/")
  public ResponseEntity<Void> create(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody CreateTrackedLocationRequest createRequest) {

    trackedlocationService.create(userDetails, createRequest);

    return ResponseEntity.ok().build();
  }
}
