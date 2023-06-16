package com.joetsumap.domain.travelbooklet.controller;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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

import com.joetsumap.domain.travelbooklet.payload.request.CreateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.request.UpdateTravelBookletRequest;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletListResponse;
import com.joetsumap.domain.travelbooklet.payload.response.TravelBookletResponse;
import com.joetsumap.domain.travelbooklet.service.TravelBookletService;
import com.joetsumap.security.services.UserDetailsImpl;

import static com.joetsumap.common.constant.ApiConst.*;
import static com.joetsumap.common.constant.ApiPathConst.*;

@CrossOrigin(origins = CROSS_ORIGIN, maxAge = MAX_AGE)
@RestController
@RequestMapping(API_TRAVEL_BOOKLET_PREFIX)
public class TravelBookletController {

  @Autowired
  TravelBookletService travelbookletService;

  @GetMapping("")
  public TravelBookletListResponse findAll() {

    return travelbookletService.findAll();
  }

  @GetMapping("/{id}")
  public TravelBookletResponse findById(@PathVariable Long id) {

    return travelbookletService.findById(id);
  }

  @PostMapping("")
  public TravelBookletResponse create(@AuthenticationPrincipal UserDetailsImpl userDetails, @Valid @RequestBody CreateTravelBookletRequest createRequest) {

    return travelbookletService.create(userDetails, createRequest);
  }

  @PatchMapping("/{id}")
  public TravelBookletResponse update(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id, @Valid @RequestBody UpdateTravelBookletRequest updateRequest) {

    return travelbookletService.update(userDetails, updateRequest, id);
  }

  @DeleteMapping("/{id}")
  public TravelBookletResponse delete(@AuthenticationPrincipal UserDetailsImpl userDetails, @PathVariable Long id) {

    return travelbookletService.delete(userDetails, id);
  }
}
