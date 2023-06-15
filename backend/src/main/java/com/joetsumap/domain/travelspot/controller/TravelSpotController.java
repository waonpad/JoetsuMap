package com.joetsumap.domain.travelspot.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.joetsumap.domain.travelspot.payload.request.CreateTravelSpotRequest;
import com.joetsumap.domain.travelspot.payload.request.UpdateTravelSpotRequest;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotListResponse;
import com.joetsumap.domain.travelspot.payload.response.TravelSpotResponse;
import com.joetsumap.domain.travelspot.service.TravelSpotService;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiConst.*;
import static com.joetsumap.common.constant.ApiPathConst.*;
import static com.joetsumap.common.constant.AuthorizeConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_TRAVEL_SPOT_PREFIX)
public class TravelSpotController {

  @Autowired
  TravelSpotService travelspotService;

  @GetMapping("/")
  public TravelSpotListResponse findAll() {

    return travelspotService.findAll();
  }

  @GetMapping("/{id}")
  public TravelSpotResponse findById(@PathVariable Long id) {

    return travelspotService.findById(id);
  }

  @PostMapping("/")
  @PreAuthorize(AUTHORIZED_ADMIN_OR_MODERATOR)
  public TravelSpotResponse create(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody CreateTravelSpotRequest createRequest) {

    return travelspotService.create(userDetails, createRequest);
  }

  @PatchMapping("/{id}")
  @PreAuthorize(AUTHORIZED_ADMIN_OR_MODERATOR)
  public TravelSpotResponse update(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id, @Valid @RequestBody UpdateTravelSpotRequest updateRequest) {

    return travelspotService.update(userDetails, updateRequest, id);
  }

  @DeleteMapping("/{id}")
  @PreAuthorize(AUTHORIZED_ADMIN_OR_MODERATOR)
  public ResponseEntity<Void> delete(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

    travelspotService.delete(userDetails, id);

    return ResponseEntity.noContent().build();
  }
}
